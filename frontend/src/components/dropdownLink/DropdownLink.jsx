import { Link } from 'react-router-dom';

import styles from './DropdownLink.module.css';

export const DropdownLink = ({ to, icon: Icon, text, onClick = null, onClose }) => {
	const handleClick = event => {
		if (onClick) {
			event.preventDefault();
			onClick();
		}
		onClose?.();
	};

	return to ? (
		<Link className={styles.dropdownLink} to={to} onClick={handleClick}>
			<Icon size={24} />
			{text}
		</Link>
	) : (
		<button className={styles.dropdownButton} onClick={handleClick}>
			<Icon size={24} />
			{text}
		</button>
	);
};
