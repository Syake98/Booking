import { Link } from 'react-router-dom';
import { LucideMapPinCheck } from 'lucide-react';

import styles from './Logo.module.css';

export const Logo = () => {
	return (
		<Link className={styles.logoBlock} to={'/'}>
			<LucideMapPinCheck color="SandyBrown" size={50} />
			<span>
				Бронирование <br /> номеров
			</span>
		</Link>
	);
};
