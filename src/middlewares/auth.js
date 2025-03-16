const jwt = require("jsonwebtoken");
const Register = require("../models/register");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await Register.findById(verifyUser._id);
        
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token. Please log in again." });
    }
};

module.exports = auth;
