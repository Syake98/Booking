import { forwardRef } from 'react';
import Select from 'react-select';

export const StyledSelect = forwardRef(
	({ options, onChange, isMulti = false, defaultValue, ...props }, ref) => {
		const bodyColor = 'rgb(255, 251, 242)';

		return (
			<div style={{ width: '35%' }}>
				<Select
					ref={ref}
					styles={{
						control: (base, state) => ({
							...base,
							boxShadow: state.isFocused ? 'none' : 'none',
							width: '100%',
							backgroundColor: `${bodyColor}`,
							border: state.isFocused ? '1px solid rgb(208, 140, 82)' : '1px solid #ccc',
							borderRadius: 24,
							padding: 4,
							'&:hover': {
								borderColor: 'rgb(208, 140, 82)',
							},
						}),
						menu: base => ({
							...base,
							backgroundColor: `${bodyColor}`,
							color: 'black',
							borderRadius: 24,
							overflow: 'hidden',
						}),
						option: (base, state) => ({
							...base,
							backgroundColor: state.isSelected ? 'Wheat' : `${bodyColor}`,
							color: 'black',
							margin: '0',
							'&:hover': {
								backgroundColor: 'SandyBrown',
							},
							padding: 12,
						}),
						menuList: base => ({
							...base,
							paddingBlock: 0,
						}),
					}}
					options={options}
					defaultValue={defaultValue}
					placeholder={isMulti ? 'Выберите необходимое' : options[0]}
					isSearchable={false}
					isClearable={false}
					onChange={onChange}
					isMulti={isMulti}
					{...props}
				/>
			</div>
		);
	},
);
