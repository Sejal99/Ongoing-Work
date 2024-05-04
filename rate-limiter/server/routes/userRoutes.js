const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for signup
router.post('/signup', userController.signup);

module.exports = router;
