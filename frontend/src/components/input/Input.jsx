import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.css';

const cls = classNames.bind(styles);

export const Input = forwardRef(({ children, className, ...props }, ref) => {
	return (
		<div className={cls('inputBlock', [className])}>
			{props.disabledlabel !== 'none' && (
				<label className={styles.inputLabel} htmlFor={props.id}>
					{children}
				</label>
			)}
			<input className={styles.input} {...props} ref={ref} />
		</div>
	);
});
