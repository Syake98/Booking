import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { addDays, differenceInDays } from 'date-fns';
import toast from 'react-hot-toast';
import { Check, PenBox, Trash2, User } from 'lucide-react';

import { Block, Modal } from '../';
import { editBooking, deleteBooking, getReservedDates } from '../../redux/actions';
import { selectReservedDates } from '../../redux/selector';

import styles from './BookingCard.module.css';

export const BookingCard = ({
	id,
	room,
	user,
	startDate,
	endDate,
	totalPrice,
	guestsAmount,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [newStartDate, setNewStartDate] = useState(startDate);
	const [newEndDate, setNewEndDate] = useState(endDate);
	const [newPrice, setNewPrice] = useState(totalPrice);
	const [intersection, setIntersection] = useState(false);
	const reservedDates = useSelector(selectReservedDates);

	const dispatch = useDispatch();

	useEffect(() => {
		console.log('new render');
		setNewStartDate(startDate);
		setNewEndDate(endDate);
		setNewPrice(totalPrice);
		setIntersection(false);
	}, [startDate, endDate, totalPrice]);

	const handleEditBooking = e => {
		e.stopPropagation();
		setIsEditing(true);
		dispatch(getReservedDates(id, room.id));
	};

	const onChangeBooking = ([startDate, endDate]) => {
		if (!startDate) {
			setNewStartDate(null);
			setNewEndDate(null);
			setIntersection(false);
			return;
		}

		setNewStartDate(startDate);

		const hasIntersection = reservedDates.some(({ start, end }) => {
			return (
				(startDate <= end && endDate >= start) || differenceInDays(endDate, startDate) < 1
			);
		});

		setIntersection(hasIntersection);

		if (hasIntersection) {
			setNewEndDate(null);
			return;
		}

		setNewEndDate(endDate);
	};

	const onSaveChanges = e => {
		e.stopPropagation();
		if (intersection) {
			e.preventDefault();
			return;
		}
		setIsEditing(false);

		const newTotalPrice = differenceInDays(newEndDate, newStartDate) * room.price;

		setNewPrice(newTotalPrice);
		dispatch(editBooking({ id, newStartDate, newEndDate, newTotalPrice }));
	};

	const handleDeleteClick = e => {
		e.stopPropagation();
		setShowModal(true);
	};

	const onDeleteBooking = () => {
		setShowModal(false);
		dispatch(deleteBooking(id));
		toast.success('Бронирование удалено');
	};

	return (
		<Block>
			<div className={styles.bookingHeader}>
				<div className={styles.roomInfo}>
					<h3>{room.name}</h3>
					<span>Номер {room.number}</span>
					<span>Этаж {room.floor}</span>
					<span>{user.email}</span>
				</div>
				<div className={styles.roomMainImage}>
					<img src={room.images[0]} alt={room.name} />
				</div>
			</div>
			<div className={styles.bookingInfoBlock}>
				<div className={styles.bookingPrice}>
					<div>
						<span>Общая стоимость:</span>
						<span>{newPrice} ₽</span>
					</div>
					<div>
						<User size={20} />
						<span>{guestsAmount}</span>
					</div>
				</div>
				<div className={styles.bookingDates}>
					<div className={styles.dateBlock} onClick={e => e.stopPropagation()}>
						<label htmlFor={`bookingDates`}>Даты проживания:</label>
						<DatePicker
							autoComplete="off"
							disabled={!isEditing}
							adjustDateOnChange
							swapRange
							className={styles.datePicker}
							id="bookingDates"
							onChange={onChangeBooking}
							locale={ru}
							excludeDateIntervals={reservedDates}
							minDate={addDays(new Date(), 1)}
							startDate={newStartDate}
							endDate={newEndDate}
							selectsRange
						/>
					</div>
					<div className={styles.changeBooking}>
						{!isEditing ? (
							<PenBox size={20} onClick={handleEditBooking} />
						) : (
							<Check
								className={styles.disabledCheck}
								size={20}
								onClick={onSaveChanges}
								disabled={intersection}
							/>
						)}
						<Trash2 size={20} onClick={handleDeleteClick} />
					</div>
				</div>
			</div>
			{showModal && (
				<Modal
					onOverlayClick={e => {
						e.stopPropagation();
						setShowModal(false);
					}}
					onConfirm={onDeleteBooking}
					onCancel={() => setShowModal(false)}
					confirmButtonText="Да"
					cancelButtonText="Нет"
				>
					Вы действительно хотите снять бронь?
				</Modal>
			)}
		</Block>
	);
};
