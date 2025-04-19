import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from 'lucide-react';

import { InputAuth, Button, Block } from '../../components';
import { registration } from '../../redux/actions';
import { selectAppIsLoading, selectUserRole } from '../../redux/selector';

import styles from './AuthAndReg.module.css';

const registerFormSchema = yup.object().shape({
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
	passCheck: yup
		.string()
		.required('Необходимо заполнить повтор пароля')
		.oneOf([yup.ref('password'), null], 'Пароли должны совпаддать'),
});

export const Registration = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const isLoading = useSelector(selectAppIsLoading);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: '', password: '', passCheck: '' },
		resolver: yupResolver(registerFormSchema),
	});

	const onSubmit = ({ email, password }) => {
		dispatch(registration({ email, password }, navigate));
	};

	if (roleId !== null) {
		return <Navigate to="/" />;
	}

	return (
		<Block className={styles.authAndRegBlock}>
			<h2 className={styles.authAndRegTitle}>Регистрация</h2>
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
				<InputAuth
					id="confirm-password"
					type="password"
					placeholder="Повторите пароль"
					error={errors.passCheck?.message}
					{...register('passCheck')}
				></InputAuth>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? (
						<Loader size={20} className={styles.loader} />
					) : (
						'Зарегистрироваться'
					)}
				</Button>
			</form>
			<Link className={styles.authAndRegLink} to="/login">
				Авторизоваться
			</Link>
		</Block>
	);
};
