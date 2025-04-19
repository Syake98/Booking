import { LogIn, FilePen } from 'lucide-react';

import { DropdownLink } from '../../../../../';

import styles from './Dropdown.module.css';

export const AuthDropdown = ({ onClose }) => {
	return (
		<div className={styles.dropdown} onClick={onClose}>
			<DropdownLink to="/login" icon={LogIn} text="Войти" onClose={onClose} />
			<DropdownLink
				to="/registration"
				icon={FilePen}
				text="Регистрация"
				onClose={onClose}
			/>
		</div>
	);
};
