import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import styles from './RoomImagesBlock.module.css';

export const RoomImagesBlock = room => {
	const [imageIdx, setImageIdx] = useState(0);

	const handleMoveForward = () => {
		setImageIdx(prev => (prev === room.images.length - 1 ? 0 : prev + 1));
	};

	const handleMoveBack = () => {
		setImageIdx(prev => (prev === 0 ? room.images.length - 1 : prev - 1));
	};

	return (
		<div className={styles.roomImagesBlock}>
			<span className={styles.changeImgButton} onClick={handleMoveBack}>
				<ChevronLeft size={30} />
			</span>
			<img className={styles.roomImg} src={room?.images[imageIdx]} alt={room?.name} />
			<span className={styles.changeImgButton} onClick={handleMoveForward}>
				<ChevronRight size={30} />
			</span>
		</div>
	);
};
