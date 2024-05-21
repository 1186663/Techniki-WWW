// app/routes/calcRoutes.js

const express = require('express');
const router = express.Router();
const calcController = require('../controllers/calcController');

router.get('/', calcController.registerForm);

module.exports = router;
