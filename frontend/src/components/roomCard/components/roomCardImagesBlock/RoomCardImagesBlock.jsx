import { useState } from 'react';

import styles from './RoomCardImagesBlock.module.css';

export const RoomCardImagesBlock = room => {
	const [imageIdx, setImageIdx] = useState(0);

	const handleHover = ({ currentTarget }) => {
		const idx = +currentTarget.dataset.index;
		setImageIdx(idx);
	};

	return (
		<div className={styles.roomImagesBlock}>
			<img className={styles.roomImg} src={room.images[imageIdx]} alt={room.name} />
			<div className={styles.sectorsBlock} onMouseLeave={() => setImageIdx(0)}>
				{room.images.map((image, idx) => (
					<div
						key={image}
						data-index={idx}
						className={styles.imageSector}
						onMouseOver={handleHover}
					>
						<span className={styles.sectorBar}></span>
					</div>
				))}
			</div>
		</div>
	);
};
