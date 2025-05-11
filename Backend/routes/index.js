const express = require('express');
const router = express.Router();

// const registerUser = require('../controller/registerUser.controller.js');
// const loginUser = require('../controller/loginUser.controller.js');
const { registerUser, loginUser, updateUser } = require('../controller/authController.js');

// router.use('/user', );
router.post('/api/register', registerUser);
router.post('/api/login', loginUser);
router.put('/api/user/:id', updateUser);

module.exports = router;