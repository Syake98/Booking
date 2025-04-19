import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';

import { ChoosePeopleButton, ChooseDateBlock } from './components';
import { getFilteredRooms, setCountDays } from '../../../../redux/actions';
import { selectSearchData } from '../../../../redux/selector';
import { countDays } from '../../../../utils';

import styles from './ReservationForm.module.css';

export const ReservationForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchData = useSelector(selectSearchData);

	const onSearch = () => {
		const days = countDays(searchData.arrivalDate, searchData.departureDate);

		if (
			new Date(searchData.arrivalDate).getDate() >=
			new Date(searchData.departureDate).getDate()
		) {
			toast.error('Дата выезда должна быть больше даты прибытия');
			return;
		}

		dispatch(setCountDays(days));
		dispatch(getFilteredRooms(searchData));
		navigate('/');
	};

	return (
		<div className={styles.reservationFormBlock}>
			<ChooseDateBlock />
			<ChoosePeopleButton />
			<Search className={styles.search} onClick={onSearch} />
		</div>
	);
};
