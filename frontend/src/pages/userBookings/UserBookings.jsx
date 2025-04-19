import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Block, Button } from '../../components';
import { getAllRooms, getMyBookings } from '../../redux/actions';
import { selectBookings } from './../../redux/selector';
import {
	RoomCardBookingsBlock,
	RoomCardImagesBlock,
} from '../../components/roomCard/components';

import styles from './UserBookings.module.css';

export const UserBookings = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userBookings = useSelector(selectBookings);

	useEffect(() => {
		dispatch(getAllRooms());
		dispatch(getMyBookings());
	}, [dispatch]);

	return (
		<Block className={styles.userBookingsBlock}>
			{userBookings.length === 0 ? (
				<div className={styles.noBookings}>
					<span>У вас нет бронирований</span>
					<Button onClick={() => navigate('/')}>Забронировать номер</Button>
				</div>
			) : (
				userBookings.map(booking => {
					return (
						<div key={booking.id} className={styles.roomCardBlock}>
							<RoomCardImagesBlock {...booking.room} />
							<RoomCardBookingsBlock {...booking} />
						</div>
					);
				})
			)}
		</Block>
	);
};
