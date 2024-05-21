// config/db.js
const mysql = require('mysql');
require('dotenv').config();

// Tworzenie połączenia z bazą danych
const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Nawiązywanie połączenia z bazą danych
dbConnection.connect(error => {
    if (error) {
        console.error('Error connecting to the database: ' + error.stack);
        return;
    }
    console.log('Successfully connected to the database as ID ' + dbConnection.threadId);
});

module.exports = dbConnection;
