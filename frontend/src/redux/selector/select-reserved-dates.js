export const selectReservedDates = ({ bookings }) =>
	bookings.reservedDates.map(({ startDate, endDate }) => ({
		start: new Date(startDate),
		end: new Date(endDate),
	}));
