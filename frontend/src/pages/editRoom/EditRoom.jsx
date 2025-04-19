import { useSelector } from 'react-redux';

import { RoomForm } from '../../components';
import { selectRoom } from '../../redux/selector';

export const EditRoom = ({ isEditing }) => {
	const room = useSelector(selectRoom);

	return <RoomForm room={room} isEditing={isEditing} />;
};
