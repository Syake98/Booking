export const handleNumberChange = ({ e, setValue, min, max, fieldName }) => {
	let amount = +e.target.value;
	if (amount > max) amount = max;
	else if (amount < min) amount = min;

	if (typeof setValue === 'function' && fieldName) {
		setValue(prevState => ({
			...prevState,
			[fieldName]: amount,
		}));
	} else if (typeof setValue === 'function') {
		setValue(amount);
	} else {
		return amount;
	}

	return amount;
};
