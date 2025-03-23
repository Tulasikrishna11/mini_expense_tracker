const express = require('express');
const { register, login, logout, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user', authMiddleware, getUser); // Add this line

module.exports = router;