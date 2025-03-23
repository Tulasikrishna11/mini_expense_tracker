const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(403).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ error: 'Failed to authenticate token' });
    }
};

module.exports = authMiddleware;
