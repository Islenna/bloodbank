const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET
module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}