// app/controllers/postController.js

const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAll();
        res.render('posts/index', { posts, user: req.session.userId, query: req.query });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.addPostForm = (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/users/login');
    }
    res.render('posts/addPost');
};

exports.addPost = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/users/login');
    }
    try {
        const { title, content } = req.body;
        await Post.create({ userId: req.session.userId, title, content });
        res.redirect('/posts');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deletePost = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.session.userId;

    try {
        const post = await Post.findById(postId);
        if (post && post.user_id === userId) {
            await Post.delete(postId);
            res.redirect('/posts?deleted=true');
        } else {
            res.redirect('/posts?deleted=false');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Wystąpił błąd.');
    }
};
