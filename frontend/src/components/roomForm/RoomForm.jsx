import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Save, Trash } from 'lucide-react';

import { features as initialFeatures } from '../../constants';
import { Block, Button, Input, Modal, StyledSelect } from '../';
import { addRoom, deleteRoom, editRoom } from '../../redux/actions';
import { handleNumberChange } from '../../utils';

import styles from './RoomForm.module.css';

const roomSchema = yup.object().shape({
	name: yup.string().required('Введите название номера'),
	price: yup.number().required('Введите цену за ночь'),
	capacity: yup.number().required('Введите вместимость'),
	roomsAmount: yup.number().required('Введите количество комнат'),
	area: yup.number().required('Введите площадь номера'),
	images: yup.array().required('Добавьте URL фотографии'),
	description: yup.string().required('Введите описание номера'),
	features: yup.object().required('Добавьте удобства номера'),
	number: yup.string().required('Введите номер номера'),
	floor: yup.string().required('Введите этаж номера'),
});

export const RoomForm = ({ room, isEditing }) => {
	const [imageUrl, setImageUrl] = useState('');
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//#region formConfig
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm({
		defaultValues: {
			name: isEditing ? room.name : '',
			price: isEditing ? room.price : 100,
			capacity: isEditing ? room.capacity : 1,
			roomsAmount: isEditing ? room.roomsAmount : 1,
			area: isEditing ? room.area : 1,
			images: isEditing ? room.images : [],
			description: isEditing ? room.description : '',
			features: isEditing ? room.features : initialFeatures,
			number: isEditing ? room.number : 1,
			floor: isEditing ? room.floor : 1,
		},
		resolver: yupResolver(roomSchema),
	});
	//#endregion

	const options = Object.keys(initialFeatures).map(feature => ({
		value: feature,
		label: feature,
	}));

	const initialSelectedFeatures = Object.keys(getValues().features)
		.filter(feature => getValues().features[feature])
		.map(feature => ({ value: feature, label: feature }));

	const handleAddImage = () => {
		try {
			new URL(imageUrl);
			if (imageUrl) {
				if (!getValues().images.includes(imageUrl)) {
					setValue('images', [...getValues().images, imageUrl]);
					setImageUrl('');
				} else {
					toast.error('Этот URL уже добавлен');
				}
			}
		} catch (error) {
			toast.error('Пожалуйста, введите корректный URL');
		}
	};

	const handleSaveChangesRoom = data => {
		dispatch(editRoom(room._id, data, navigate));
	};

	const handleAddRoom = data => {
		dispatch(addRoom(data, navigate));
	};

	const handleDeleteRoom = () => {
		setShowModal(false);
		dispatch(deleteRoom(room._id, navigate));
	};

	const onSubmit = () => (isEditing ? handleSaveChangesRoom : handleAddRoom);

	return (
		<Block className={styles.roomFormBlock}>
			<div className={styles.roomFormHeader}>
				<h2>{isEditing ? 'Редактирование комнаты' : 'Создание комнаты'}</h2>
				<Trash size={20} onClick={() => setShowModal(true)} />
				<Save size={20} onClick={handleSubmit(onSubmit())} />
			</div>
			{showModal && (
				<Modal
					onOverlayClick={e => {
						e.stopPropagation();
						setShowModal(false);
					}}
					onConfirm={handleDeleteRoom}
					onCancel={() => setShowModal(false)}
					confirmButtonText="Да"
					cancelButtonText="Нет"
				>
					Вы действительно хотите удалить номер?
				</Modal>
			)}
			<form onSubmit={handleSubmit(onSubmit())} className={styles.roomForm}>
				<Input
					className={styles.inputHeader}
					name="name"
					type="text"
					placeholder="Название комнаты..."
					{...register('name')}
				>
					Название комнаты
				</Input>
				{
					//#region Images
				}
				<Input
					className={styles.inputHeader}
					name="imageUrl"
					type="text"
					placeholder="Добавьте URL фотографии..."
					value={imageUrl}
					onChange={e => setImageUrl(e.target.value)}
				>
					Фотографии номера
				</Input>
				<Button className={styles.addImageButton} type="button" onClick={handleAddImage}>
					Добавить фотографию
				</Button>
				{getValues().images.length === 0 ? (
					<span>На данный момент нет фотографий</span>
				) : (
					<div className={styles.roomImages}>
						<Controller
							name="images"
							control={control}
							render={({ field }) => {
								return field.value?.map((url, index) => (
									<div key={`${index}${url}`} className={styles.roomImage}>
										<span>{url}</span>
										<Trash
											size={20}
											onClick={() => {
												setValue(
													'images',
													getValues().images.filter((_, i) => i !== index),
												);
											}}
										/>
									</div>
								));
							}}
						></Controller>
					</div>
				)}
				{
					//#endregion
					//#region Select
				}
				<Controller
					name="features"
					control={control}
					render={() => {
						return (
							<StyledSelect
								onChange={selected => {
									setValue(
										'features',
										Object.entries(getValues().features).reduce((acc, [feature]) => {
											acc[feature] = selected.some(option => option.value === feature);
											return acc;
										}, {}),
									);
								}}
								options={options}
								isMulti={true}
								defaultValue={initialSelectedFeatures}
							/>
						);
					}}
				/>
				{/*#endregion*/}
				<div className={styles.roomProperties}>
					<Input
						className={styles.inputBlock}
						name="price"
						type="number"
						{...register('price')}
						onChange={e =>
							setValue(
								'price',
								handleNumberChange({
									e,
									min: 100,
									max: 10000,
								}),
							)
						}
					>
						Цена за ночь
					</Input>
					<Input
						className={styles.inputBlock}
						name="capacity"
						type="number"
						{...register('capacity')}
						onChange={e =>
							setValue(
								'capacity',
								handleNumberChange({
									e,
									min: 1,
									max: 10,
								}),
							)
						}
					>
						Вместимость
					</Input>
					<Input
						className={styles.inputBlock}
						name="roomsAmount"
						type="number"
						{...register('roomsAmount')}
						onChange={e =>
							setValue(
								'roomsAmount',
								handleNumberChange({
									e,
									min: 1,
									max: 5,
								}),
							)
						}
					>
						Количество комнат
					</Input>
					<Input
						className={styles.inputBlock}
						name="area"
						type="number"
						{...register('area')}
						onChange={e =>
							setValue(
								'area',
								handleNumberChange({
									e,
									min: 1,
									max: 50,
								}),
							)
						}
					>
						Площадь номера
					</Input>
					<Input
						className={styles.inputBlock}
						name="number"
						type="number"
						{...register('number')}
						onChange={e =>
							setValue(
								'number',
								handleNumberChange({
									e,
									min: 1,
									max: 100,
								}),
							)
						}
					>
						Номер комнаты
					</Input>
					<Input
						className={styles.inputBlock}
						name="floor"
						type="number"
						{...register('floor')}
						onChange={e =>
							setValue(
								'floor',
								handleNumberChange({
									e,
									min: 1,
									max: 10,
								}),
							)
						}
					>
						Этаж
					</Input>
				</div>
				<div className={styles.textareaBlock}>
					<textarea
						className={styles.textarea}
						{...register('description')}
						placeholder="Описание комнаты..."
					/>
				</div>
			</form>
		</Block>
	);
};
