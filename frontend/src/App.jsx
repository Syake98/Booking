import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Header, Block } from './components';
import {
	AllBookings,
	AllRooms,
	Authorization,
	EditRoom,
	Main,
	NotFound,
	Room,
	Registration,
	UserBookings,
} from './pages';

import 'react-datepicker/dist/react-datepicker.css';

export const App = () => {
	return (
		<>
			<Header />
			<Block>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/all-bookings" element={<AllBookings />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/rooms" element={<AllRooms />} />
					<Route path="/room/:id" element={<Room />} />
					<Route path="/rooms/add" element={<EditRoom isEditing={false} />} />
					<Route path="/rooms/edit/:id" element={<EditRoom isEditing={true} />} />
					<Route path="/user-bookings" element={<UserBookings />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Block>
			<Toaster toastOptions={{ position: 'top-left' }} />
		</>
	);
};
