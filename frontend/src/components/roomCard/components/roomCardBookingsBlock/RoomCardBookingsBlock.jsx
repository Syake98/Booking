import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { addDays, differenceInDays } from 'date-fns';
import toast from 'react-hot-toast';
import { Check, PenBox, Trash2 } from 'lucide-react';

import { RoomCardHeader } from '../';
import { Modal } from '../../../';
import { deleteBooking, getReservedDates, editBooking } from '../../../../redux/actions';
import { selectReservedDates } from './../../../../redux/selector';

import styles from './RoomCardBookingsBlock.module.css';

export const RoomCardBookingsBlock = ({ id, room, startDate, endDate, totalPrice }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [newStartDate, setNewStartDate] = useState(startDate);
	const [newEndDate, setNewEndDate] = useState(endDate);
	const [newPrice, setNewPrice] = useState(totalPrice);
	const [intersection, setIntersection] = useState(false);
	const reservedDates = useSelector(selectReservedDates);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
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
		<div
			className={styles.roomDescription}
			onClick={() => {
				navigate(`/room/${room?.id}`, { state: { from: location.pathname } });
			}}
		>
			<RoomCardHeader {...room} />
			<div className={styles.roomCardFooter}>
				<div className={styles.roomPrice}>
					<div className={styles.dateBlock} onClick={e => e.stopPropagation()}>
						<DatePicker
							autoComplete="off"
							disabled={!isEditing}
							adjustDateOnChange
							swapRange
							className={styles.datePicker}
							id="arrivalDate"
							onChange={onChangeBooking}
							locale={ru}
							excludeDateIntervals={reservedDates}
							minDate={addDays(new Date(), 1)}
							startDate={newStartDate}
							endDate={newEndDate}
							selectsRange
						/>
						<span>К оплате {newPrice} ₽</span>
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
				</div>
			</div>
		</div>
	);
};
