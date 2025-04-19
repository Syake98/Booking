import classNames from 'classnames/bind';

import styles from './Button.module.css';

const cls = classNames.bind(styles);

export const Button = ({ children, className, ...props }) => {
	return (
		<button className={cls('buttonBlock', [className])} {...props}>
			{children}
		</button>
	);
};
