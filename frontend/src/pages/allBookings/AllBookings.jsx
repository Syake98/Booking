import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Block, BookingCard, Button, StyledSelect } from '../../components';
import { getAllBookings, getAllRooms } from '../../redux/actions';
import { selectBookings } from '../../redux/selector';

import styles from './AllBookings.module.css';

export const AllBookings = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const allBookings = useSelector(selectBookings);
	const [filteredBookings, setFilteredBookings] = useState([]);

	const allUsers = [...new Set(allBookings.map(({ user: { email } }) => email))].map(
		email => ({ value: email, label: email }),
	);

	const options = [{ value: 'all', label: 'Все' }, ...allUsers];

	useEffect(() => {
		dispatch(getAllRooms());
		dispatch(getAllBookings());
		setFilteredBookings(allBookings);
	}, [dispatch, allBookings.length]);

	const choseUserBookings = selectedOption => {
		const email = selectedOption.value;
		if (email === 'all') {
			setFilteredBookings(allBookings);
			return;
		}
		const newBookings = allBookings.filter(booking => booking.user.email === email);
		setFilteredBookings(newBookings);
	};

	return (
		<Block>
			{!filteredBookings.length ? (
				<div className={styles.noBookings}>
					<span>Бронирований нет</span>
					<Button onClick={() => navigate('/rooms')}>К номерам</Button>
				</div>
			) : (
				<div className={styles.allBookings}>
					<h2 className={styles.bookingTitle}>Список бронирований</h2>
					<StyledSelect
						options={options}
						onChange={choseUserBookings}
						defaultValue={options[0]}
					/>
					<div className={styles.userBookingsBlock}>
						{filteredBookings?.map(booking => (
							<div key={booking.id} className={styles.roomCardBlock}>
								<BookingCard {...booking} />
							</div>
						))}
					</div>
				</div>
			)}
		</Block>
	);
};
