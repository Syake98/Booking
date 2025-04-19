import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutGrid, MoveDiagonal, Star, Users } from 'lucide-react';
import toast from 'react-hot-toast';

import { ROLES } from '../../../constants';
import { Button, Modal } from '../..';
import { getFeaturesIcons } from '../../../utils';
import { addBooking, setRoom } from '../../../redux/actions';
import {
	selectAppIsAuth,
	selectBooking,
	selectSearchData,
	selectUserRole,
} from '../../../redux/selector';

import styles from './RoomDescrBlock.module.css';

export const RoomDescrBlock = room => {
	const [isConfirmed, setIsConfirmed] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const searchData = useSelector(selectSearchData);
	const isAuth = useSelector(selectAppIsAuth);
	const userRole = useSelector(selectUserRole);
	const booking = useSelector(selectBooking);

	const isAdmin = userRole === ROLES.ADMIN;

	const onBooking = () => {
		setIsConfirmed(false);

		if (booking?.room?.toString() === room._id.toString()) {
			toast.error('Вы уже забронировали эту комнату');
			return;
		}
		dispatch(
			addBooking(
				{
					room: room._id,
					startDate: new Date(searchData.arrivalDate),
					endDate: new Date(searchData.departureDate),
					totalPrice: room.price * searchData.countDays,
					guestsAmount: searchData.guestsAmount,
				},
				navigate,
			),
			toast.success('Бронирование прошло успешно'),
		);
	};

	return (
		<div className={styles.roomBlock}>
			<div className={styles.roomHeader}>
				<div className={styles.roomRating}>
					<h2 className={styles.roomName}>{room.name}</h2>
					<div className={styles.roomRating}>
						{!room.averageRating ? 'Нет рейтинга' : room.averageRating}
						<Star size={25} color="SandyBrown" />
					</div>
				</div>
				<div className={styles.roomPrice}>
					<span>
						{room.price * searchData.countDays} ₽ за {searchData.countDays}{' '}
						{searchData.countDays === 1 ? 'ночь' : 'ночей'}
					</span>
				</div>
				{isConfirmed &&
					(isAuth ? (
						<Modal
							onOverlayClick={() => setIsConfirmed(false)}
							onConfirm={onBooking}
							onCancel={() => setIsConfirmed(false)}
							confirmButtonText="Да"
							cancelButtonText="Нет"
						>
							Вы действительно хотите забронировать номер?
						</Modal>
					) : (
						<Modal
							onOverlayClick={() => setIsConfirmed(false)}
							onConfirm={() => navigate('/login')}
							onCancel={() => setIsConfirmed(false)}
							confirmButtonText="Войти"
							cancelButtonText="Отмена"
						>
							Вам необходимо зарегистрироваться на сайте
						</Modal>
					))}
				{isAdmin ? (
					<Button
						className={styles.roomButton}
						onClick={() => {
							dispatch(setRoom(room));
							navigate(`/rooms/edit/${room._id}`);
						}}
					>
						Редактировать
					</Button>
				) : (
					<Button
						className={styles.roomButton}
						onClick={() => setIsConfirmed(true)}
						disabled={location.state?.from === '/user-bookings'}
					>
						Забронировать
					</Button>
				)}
			</div>
			<div className={styles.roomFeatures}>
				{room.features &&
					Object.entries(room.features)
						.filter(([_, value]) => value)
						.map(([key, value]) => (
							<div key={key}>
								{value ? getFeaturesIcons(styles.roomFeature, key) : null}
							</div>
						))}
			</div>
			<div className={styles.roomProps}>
				<span className={styles.roomFeature}>Номер {room.number}</span>
				<span className={styles.roomFeature}>Этаж {room.floor}</span>
				<div className={styles.roomFeature}>
					<Users size={15} />
					<span>до {room.capacity} мест</span>
				</div>
				<div className={styles.roomFeature}>
					<MoveDiagonal size={15} />
					<span>{room.area} м2</span>
				</div>
				<div className={styles.roomFeature}>
					<LayoutGrid className={styles.featureIcon} size={15} />
					<span>{room.roomsAmount} комн.</span>
				</div>
			</div>
			<div className={styles.roomDescription}>{room.description}</div>
		</div>
	);
};
