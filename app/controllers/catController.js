// app/controllers/catController.js

const Cat = require('../models/catModel');

exports.getCatsForLoggedInUser = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/users/login');
    }

    try {
        const cats = await Cat.findAllByUserId(req.session.userId);
        res.render('cat/list', { cats, query: req.query });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.addCatForm = (req, res) => {
    res.render('cat/addCat');
};

exports.addCat = async (req, res) => {
    try {
        const { name, age, breed, color } = req.body;
        const userId = req.session.userId; 
        await Cat.create({ name, age, breed, color, userId });
        res.redirect('/cats');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCat = async (req, res) => {
    try {
        const catId = req.params.catId;
        await Cat.delete(catId);
        res.redirect('/cats?deleted=true');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
