import { Block } from '../';
import { Logo, ReservationForm, ControlPanel } from './components';

import styles from './Header.module.css';

export const Header = () => (
	<header className={styles.headerBlock}>
		<Block className={styles.header}>
			<Logo />
			<ReservationForm />
			<ControlPanel />
		</Block>
	</header>
);
