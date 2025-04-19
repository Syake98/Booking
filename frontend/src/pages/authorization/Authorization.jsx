import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from 'lucide-react';

import { InputAuth, Button, Block } from '../../components';
import { authorization } from '../../redux/actions';
import { selectAppIsLoading, selectUserRole } from '../../redux/selector';

import styles from './AuthAndReg.module.css';

const authFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Необходимо ввести электронную почту')
		.email('Некорректная электронная почта'),
	password: yup
		.string()
		.required('Необходимо ввести пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %',
		)
		.min('5', 'Минимальная длина пароля 5 символов')
		.max('30', 'Максимальная длина пароля 30 символов'),
});

export const Authorization = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const isLoading = useSelector(selectAppIsLoading);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: '', password: '' },
		resolver: yupResolver(authFormSchema),
	});

	const onSubmit = ({ email, password }) => {
		dispatch(authorization({ email, password }, navigate));
	};

	if (roleId !== null) {
		return <Navigate to="/" />;
	}

	return (
		<Block className={styles.authAndRegBlock}>
			<h2 className={styles.authAndRegTitle}>Авторизация</h2>
			<form className={styles.authAndRegForm} onSubmit={handleSubmit(onSubmit)}>
				<InputAuth
					id="email"
					type="text"
					placeholder="Электронная почта"
					error={errors.email?.message}
					{...register('email')}
				></InputAuth>
				<InputAuth
					id="password"
					type="password"
					placeholder="Пароль"
					error={errors.password?.message}
					{...register('password')}
				></InputAuth>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? <Loader size={20} className={styles.loader} /> : 'Войти в аккаунт'}
				</Button>
			</form>
			<Link className={styles.authAndRegLink} to="/registration">
				Зарегистрироваться
			</Link>
		</Block>
	);
};
