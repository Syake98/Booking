import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Block, Loader, RoomCard } from '../../components';
import { getFilteredRooms } from '../../redux/actions';
import { selectAppIsLoading, selectRooms, selectSearchData } from '../../redux/selector';

import styles from './Main.module.css';

export const Main = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectAppIsLoading);

	const rooms = useSelector(selectRooms);
	const searchData = useSelector(selectSearchData);

	useEffect(() => {
		dispatch(getFilteredRooms(searchData));
	}, [dispatch]);

	return (
		<Block className={styles.mainBlock}>
			{isLoading
				? new Array(6).fill(null).map(_ => <Loader />)
				: rooms.length && rooms.map(room => <RoomCard key={room._id} {...room} />)}
		</Block>
	);
};
