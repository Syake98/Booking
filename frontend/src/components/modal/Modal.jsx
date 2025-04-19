import { Button } from '../';

import styles from './Modal.module.css';

export const Modal = ({
	children,
	onOverlayClick,
	onConfirm,
	onCancel,
	confirmButtonText,
	cancelButtonText,
}) => {
	return (
		<div className={styles.modal}>
			<div className={styles.overlay} onClick={onOverlayClick}>
				<div className={styles.box} onClick={e => e.stopPropagation()}>
					<h3>{children}</h3>
					<div className={styles.buttons}>
						<Button className={styles.button} onClick={onConfirm}>
							{confirmButtonText}
						</Button>
						<Button className={styles.button} onClick={onCancel}>
							{cancelButtonText}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
