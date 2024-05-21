// app/routes/catRoutes.js

const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');

router.get('/', catController.getCatsForLoggedInUser);
router.get('/add', catController.addCatForm);
router.post('/add', catController.addCat);
router.post('/:catId/delete', catController.deleteCat);

module.exports = router;
