import { RoomCardDescrBlock, RoomCardImagesBlock } from './components';

import styles from './RoomCard.module.css';

export const RoomCard = room => {
	return (
		<div className={styles.roomCardBlock}>
			<RoomCardImagesBlock {...room} />
			<RoomCardDescrBlock {...room} />
		</div>
	);
};
