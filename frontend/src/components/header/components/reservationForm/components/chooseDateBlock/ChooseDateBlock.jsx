import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { addDays } from 'date-fns';

import { setArrivalDate, setDepartureDate } from '../../../../../../redux/actions';
import { selectSearchData } from '../../../../../../redux/selector';

import styles from './ChooseDateButton.module.css';

export const ChooseDateBlock = () => {
	const dispatch = useDispatch();
	const { arrivalDate, departureDate } = useSelector(selectSearchData);

	const onDatesChange = dates => {
		dispatch(setArrivalDate(dates[0]));
		dispatch(setDepartureDate(dates[1]));
	};

	return (
		<div data-id="arrivalDate" className={styles.dateBlock}>
			<label className={styles.dateLabel} htmlFor={`arrivalDate`}>
				Заезд - Выезд
			</label>
			<DatePicker
				adjustDateOnChange
				swapRange
				className={styles.datePicker}
				id="arrivalDate"
				selected={arrivalDate}
				onChange={onDatesChange}
				locale={ru}
				minDate={addDays(new Date(), 1)}
				startDate={arrivalDate}
				endDate={departureDate}
				selectsRange
			/>
		</div>
	);
};
