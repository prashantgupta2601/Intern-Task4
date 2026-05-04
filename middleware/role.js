module.exports = {
    checkRole: function (roles) {
        return (req, res, next) => {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            if (roles.includes(req.user.role)) {
                return next();
            }

            res.status(403).json({ message: 'Forbidden: You do not have permission' });
        };
    }
};
