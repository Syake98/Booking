import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Block, Button, RoomCard, StyledSelect } from '../../components';
import { getAllRooms } from '../../redux/actions';
import { selectRooms } from '../../redux/selector';

import styles from './AllRooms.module.css';

export const AllRooms = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const rooms = useSelector(selectRooms);
	const [chosenRoom, setChosenRoom] = useState([]);

	const allRooms = rooms.map(room => ({ value: room.name, label: room.name }));

	const options = [{ value: 'all', label: 'Все' }, ...allRooms];

	useEffect(() => {
		dispatch(getAllRooms());
		setChosenRoom(rooms);
	}, [dispatch, rooms.length]);

	const choseRoom = selectedOption => {
		const roomName = selectedOption.value;
		if (roomName === 'all') {
			setChosenRoom(rooms);
			return;
		}
		const newRoom = rooms.filter(room => room.name === roomName);
		setChosenRoom(newRoom);
	};

	return (
		<Block>
			{!rooms.length ? (
				<div className={styles.noRooms}>
					<span>Комнат еще нет</span>
					<Button onClick={() => navigate('/')}>Создать комнату</Button>
				</div>
			) : (
				<div className={styles.allRooms}>
					<h2 className={styles.roomTitle}>Список комнат</h2>
					<StyledSelect
						options={options}
						onChange={choseRoom}
						defaultValue={options[0]}
					/>
					<Button className={styles.createRoom} onClick={() => navigate('/rooms/add')}>
						Создать комнату
					</Button>
					<div className={styles.rooms}>
						{chosenRoom?.map(room => (
							<RoomCard key={room._id} {...room} />
						))}
					</div>
				</div>
			)}
		</Block>
	);
};
