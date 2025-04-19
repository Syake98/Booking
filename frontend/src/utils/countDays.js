export const countDays = (arrivalDate, departureDate) => {
	const date1 = new Date(arrivalDate);
	const date2 = new Date(departureDate);
	const diffDays = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

	if (diffDays === 0) {
		return 1;
	}

	return diffDays;
};
