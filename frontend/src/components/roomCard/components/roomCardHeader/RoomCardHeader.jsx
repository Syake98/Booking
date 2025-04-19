import { LayoutGrid, MoveDiagonal, Star, Users } from 'lucide-react';

import styles from './RoomCardHeader.module.css';

export const RoomCardHeader = room => {
	return (
		<>
			<div className={styles.roomHeader}>
				<h3 className={styles.roomName}>{room.name}</h3>
				<span>{room.averageRating === 0 ? 'Нет отзывов' : room.averageRating}</span>
				<Star size={20} color="SandyBrown" />
			</div>
			<div className={styles.roomFeatures}>
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
		</>
	);
};
