// app/models/postModel.js

const db = require('../../config/db');

class Post {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static create({ userId, title, content }) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)';
            db.query(query, [userId, title, content], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static delete(postId) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM posts WHERE id = ?', [postId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows);
                }
            });
        });
    }

    static findById(postId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM posts WHERE id = ?';
            db.query(query, [postId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
}

module.exports = Post;
