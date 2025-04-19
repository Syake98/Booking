import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Crown, Menu, User } from 'lucide-react';

import { ROLES } from '../../../../constants';
import { AdminDropdown, AuthDropdown, UserDropdown } from './components';
import { selectAppIsAuth, selectUserRole } from '../../../../redux/selector';

import styles from './ControlPanel.module.css';

export const ControlPanel = () => {
	const [activeDropdown, setActiveDropdown] = useState(null);

	const userRole = useSelector(selectUserRole);
	const isAuth = useSelector(selectAppIsAuth);

	const isAdmin = userRole === ROLES.ADMIN;

	const onShow = type => {
		if (activeDropdown === type) {
			setActiveDropdown(null);
		} else {
			setActiveDropdown(type);
		}
	};

	return (
		<div className={styles.controlPanelBlock}>
			{isAuth ? (
				<>
					{isAdmin ? (
						<Crown
							className={styles.controlPanelSwg}
							onClick={() => onShow('admin')}
							size="30"
						/>
					) : (
						<User
							className={styles.controlPanelSwg}
							onClick={() => onShow('user')}
							size="30"
						/>
					)}
				</>
			) : (
				<Menu
					className={styles.controlPanelSwg}
					onClick={() => onShow('auth')}
					size="30"
				/>
			)}
			{isAdmin && activeDropdown === 'admin' && (
				<AdminDropdown onClose={() => setActiveDropdown(null)} />
			)}
			{!isAdmin && activeDropdown === 'user' && (
				<UserDropdown onClose={() => setActiveDropdown(null)} />
			)}
			{activeDropdown === 'auth' && (
				<AuthDropdown onClose={() => setActiveDropdown(null)} />
			)}
		</div>
	);
};
