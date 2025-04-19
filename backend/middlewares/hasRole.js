module.exports = function (roles) {
	return (req, res, next) => {
		if (!roles.includes(req.user.roleId)) {
			res.send({ error: 'Доступ отклонен' });

			return;
		}
		next();
	};
};
