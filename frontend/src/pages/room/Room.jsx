import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	Block,
	RoomCommentsBlock,
	RoomDescrBlock,
	RoomImagesBlock,
} from '../../components';
import { selectRooms } from '../../redux/selector';

import styles from './Room.module.css';

export const Room = () => {
	const params = useParams();

	const rooms = useSelector(selectRooms);

	const room = rooms.find(room => room._id === params.id);

	return (
		<Block className={styles.roomBlock}>
			<div className={styles.roomInfoBlock}>
				<RoomImagesBlock {...room} />
				<RoomDescrBlock {...room} />
			</div>
			<RoomCommentsBlock roomId={room?._id} />
		</Block>
	);
};
