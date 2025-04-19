import { useNavigate } from 'react-router-dom';

import { Block, Button } from '../../components';

import styles from './NotFound.module.css';

export const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Block>
			<div className={styles.notFound}>
				<span>Страница не найдена</span>
				<Button onClick={() => navigate('/')}>На главную</Button>
			</div>
		</Block>
	);
};
