import ContentLoader from 'react-content-loader';

import styles from './Loader.module.css';

export const Loader = props => {
	return (
		<div className={styles.loader}>
			<ContentLoader
				speed={2}
				width="100%"
				height={400}
				backgroundColor="PeachPuff"
				foregroundColor="SandyBrown"
				{...props}
			>
				<rect x="0" y="0" width="100%" height="60%" />
				<rect x="20" y="66.5%" rx="4" ry="4" width="33%" height="20" />
				<rect x="20" y="75.5%" rx="4" ry="4" width="66%" height="16" />
				<rect x="20" y="86%" rx="4" ry="4" width="28%" height="16" />
				<rect
					x="calc(100% - 160px)"
					y="calc(100% - 68px)"
					rx="20"
					ry="20"
					width="140"
					height="40"
				/>
			</ContentLoader>
		</div>
	);
};
