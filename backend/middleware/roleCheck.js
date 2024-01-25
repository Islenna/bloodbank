module.exports = {
    checkRole: (roles) => (req, res, next) => {

        if (req.user && roles.includes(req.user.role)) {
            return next();
        } else {
            res.status(403).json({ message: "Access denied. You don't have the required permissions." });
        }
    }
};
