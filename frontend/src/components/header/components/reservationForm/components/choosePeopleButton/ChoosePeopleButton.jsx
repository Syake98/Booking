import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Input } from '../../../../../';
import { setGuestsAmount } from '../../../../../../redux/actions';
import { handleNumberChange } from '../../../../../../utils';

export const ChoosePeopleButton = () => {
	const dispatch = useDispatch();
	const [guests, setGuests] = useState(1);

	const handlePeopleChange = e => {
		const newValue = handleNumberChange({ e, setValue: setGuests, min: 1, max: 10 });
		dispatch(setGuestsAmount(newValue));
	};

	return (
		<Input
			id="guestsAmount"
			name="guestsAmount"
			type="number"
			value={guests}
			onChange={e => handlePeopleChange(e)}
		>
			Гости
		</Input>
	);
};
