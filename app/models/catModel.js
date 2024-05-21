// app/models/catModel.js

const db = require('../../config/db');

class Cat {
    static create({ name, age, breed, color, userId }) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO cats (name, age, breed, color, user_id) VALUES (?, ?, ?, ?, ?)`;
            db.query(query, [name, age, breed, color, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static findAllByUserId(userId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM cats WHERE user_id = ?`;
            db.query(query, [userId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static delete(catId) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM cats WHERE id = ?`;
            db.query(query, [catId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows);
                }
            });
        });
    }
}

module.exports = Cat;