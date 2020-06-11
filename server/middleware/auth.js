require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({ message: 'No token, operation denied.' });
        }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload.
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({message: 'Session Expired. Please sign in again.'})
    }
} 

module.exports = auth;