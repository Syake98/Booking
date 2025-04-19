import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './InputAuth.module.css';

const cls = classNames.bind(styles);

export const InputAuth = forwardRef(({ error, className, ...props }, ref) => {
	return (
		<div className={cls('inputBlock', [className])}>
			<label className={styles.inputLabel} htmlFor={props.id}>
				{error}
			</label>
			<input className={styles.input} {...props} ref={ref} />
		</div>
	);
});

InputAuth.displayName = 'InputAuth';
