// app/models/userModel.js

const db = require('../../config/db');
const bcrypt = require('bcryptjs');

class User {

    static create(newUser) {
        const { username, email, password } = newUser;
        const userExistsQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
        return new Promise((resolve, reject) => {
            db.query(userExistsQuery, [username, email], async (err, results) => {
                if (err) reject(err);
                else if (results.length > 0) reject(new Error("Konto o podanym pseudonimie lub e-mailu już istnieje."));
                else {
                    const hashedPassword = await bcrypt.hash(password, 8);
                    const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
                    db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
                        if (err) reject(err);
                        else resolve(result.insertId);
                    });
                }
            });
        });
    }

    static findByUsernameOrEmail(username, email, userId) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE (username = ? OR email = ?) AND id != ?";
            db.query(query, [username, email, userId], (err, results) => {
                if (err) reject(err);
                else resolve(results.length > 0);
            });
        });
    }


    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE email = ?";
            db.query(query, [email], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    }

    static findById(userId) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?";
            db.query(query, [userId], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    }

    static update(userId, updates) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE users SET username = ?, email = ? WHERE id = ?";
            db.query(query, [updates.username, updates.email, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static delete(userId) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM users WHERE id = ?";
            db.query(query, [userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows);
                }
            });
        });
    }

}

module.exports = User;
