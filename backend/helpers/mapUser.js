module.exports = function (user) {
	return {
		id: user._id,
		email: user.email,
		roleId: user.roleId,
	};
};
