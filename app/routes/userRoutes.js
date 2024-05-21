// app/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.registerForm);
router.post('/register', userController.registerUser);

router.get('/login', userController.loginForm);
router.post('/login', userController.loginUser);

router.get('/profile', userController.userProfile);

router.get('/profile/edit', userController.updateUserProfileForm);
router.post('/profile/edit', userController.updateUserProfile);
router.post('/profile/delete', userController.deleteUserAccount);

router.get('/logout', userController.logoutUser);

module.exports = router;
