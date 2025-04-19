module.exports = function (room) {
	return {
		id: room._id,
		name: room.name,
		price: room.price,
		capacity: room.capacity,
		roomsAmount: room.roomsAmount,
		area: room.area,
		features: room.features,
		images: room.images,
		description: room.description,
		number: room.number,
		floor: room.floor,
		rating: room.rating,
		averageRating: room.averageRating,
	};
};
