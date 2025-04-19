import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar, LogOut, Settings } from 'lucide-react';

import { DropdownLink } from '../../../../../';
import { logout } from '../../../../../../redux/actions';

import styles from './Dropdown.module.css';

export const AdminDropdown = ({ onClose }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout(navigate));
		onClose();
	};

	return (
		<div className={styles.dropdown} onClick={onClose}>
			<DropdownLink to="/rooms" icon={Settings} text="Номера" onClose={onClose} />
			<DropdownLink
				to="/all-bookings"
				icon={Calendar}
				text="Бронирования"
				onClose={onClose}
			/>
			<DropdownLink onClick={onLogout} icon={LogOut} text="Выйти" />
		</div>
	);
};
