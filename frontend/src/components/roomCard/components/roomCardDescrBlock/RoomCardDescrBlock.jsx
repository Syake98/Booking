import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RoomCardHeader } from '../';
import { selectSearchData } from '../../../../redux/selector';

import styles from './RoomCardDescrBlock.module.css';

export const RoomCardDescrBlock = room => {
	const navigate = useNavigate();
	const { countDays } = useSelector(selectSearchData);

	return (
		<div className={styles.roomDescription} onClick={() => navigate(`/room/${room._id}`)}>
			<RoomCardHeader {...room} />
			<div className={styles.roomCardFooter}>
				<div className={styles.roomPrice}>
					<span>
						{room.price * countDays} ₽ за {countDays}{' '}
						{countDays === 1
							? 'ночь'
							: countDays >= 2 && countDays <= 4
							? 'ночи'
							: 'ночей'}
					</span>
				</div>
			</div>
		</div>
	);
};
