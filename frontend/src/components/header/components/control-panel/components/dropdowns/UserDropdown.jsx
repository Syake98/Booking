import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar, LogOut } from 'lucide-react';

import { DropdownLink } from '../../../../../';
import { logout } from '../../../../../../redux/actions';

import styles from './Dropdown.module.css';

export const UserDropdown = ({ onClose }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout(navigate));
		onClose();
	};

	return (
		<div className={styles.dropdown} onClick={onClose}>
			<DropdownLink
				to="/user-bookings"
				icon={Calendar}
				text="Бронирования"
				onClose={onClose}
			/>
			<DropdownLink onClick={onLogout} icon={LogOut} text="Выйти" />
		</div>
	);
};
