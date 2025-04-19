import classNames from 'classnames/bind';

import styles from './Block.module.css';

const cls = classNames.bind(styles);

export const Block = ({ className, children }) => {
	return <div className={cls('block', [className])}>{children}</div>;
};
