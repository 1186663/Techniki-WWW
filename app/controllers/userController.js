// app/controllers/userController.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.registerForm = (req, res) => {
    res.render('user/register', { message: "" });
};

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findByUsernameOrEmail(username, email);
        if (userExists) {
            return res.status(409).render('user/register', {
                message: "Konto o podanym pseudonimie lub e-mailu już istnieje."
            });
        } else {
            const userId = await User.create({ username, email, password });
            return res.redirect('/users/login');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


exports.loginForm = (req, res) => {
    res.render('user/login', { query: req.query, error: "" });
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user) {
            return res.render('user/login', { error: 'Nie znaleziono konta z tym adresem email.', query: req.query });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render('user/login', { error: 'Nieprawidłowe hasło.', query: req.query });
        }
        req.session.userId = user.id;
        return res.redirect('/users/profile');
    } catch (error) {
        console.error(error);
        return res.status(500).render('user/login', { error: 'Wystąpił błąd podczas procesu logowania.', query: req.query });
    }
};

exports.userProfile = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/users/login');
    }

    try {
        const user = await User.findById(req.session.userId);
        if (user) {
            res.render('user/profile', { user });
        } else {
            res.send("Nie znaleziono użytkownika."); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Wystąpił błąd.");
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.session.userId;


        const { username, email, password } = req.body;
        const userExists = await User.findByUsernameOrEmail(username, email, userId);
        if (userExists) {
            const user = await User.findById(req.session.userId);
            return res.status(409).render('user/editProfile', { user, 
                message: "Konto o podanym pseudonimie lub e-mailu już istnieje."
            });
        } else {
        let updatedData = { username, email };
        



        if (password) {
            updatedData.password = await bcrypt.hash(password, 8);
        }
        await User.update(userId, updatedData);
        res.redirect('/users/profile');
    }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteUserAccount = async (req, res) => {
    try {
        const userId = req.session.userId;
        await User.delete(userId);
        req.session.destroy(() => {
            res.redirect('/users/login?deleted=true');
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateUserProfileForm = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId);
        if (user) {
            res.render('user/editProfile', { user, message: "" });
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Wystąpił błąd podczas wylogowywania.");
        }
        res.redirect('/users/login?loggedOut=true');
    });
};

