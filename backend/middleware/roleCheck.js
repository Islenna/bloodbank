const roleCheck = {
    isAdmin: (req, res, next) => {
        if (req.user && req.user.role === 'admin') {
            return next();
        } else {
            res.status(403).json({ message: "Access denied. Admins only." });
        }
    },
    isManager: (req, res, next) => {
        if (req.user && (req.user.role === 'admin' || req.user.role === 'manager')) {
            return next();
        } else {
            res.status(403).json({ message: "Access denied. Managers only." });
        }
    },
    };

module.exports = roleCheck;
