// app/routes/postRoutes.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/add', postController.addPostForm);
router.post('/add', postController.addPost);
router.post('/:postId/delete', postController.deletePost);

module.exports = router;