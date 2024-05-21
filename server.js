// server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const app = express();

// Ładowanie zmiennych środowiskowych z pliku .env
dotenv.config();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto', httpOnly: true }
}));

// Reszta konfiguracji
const { db } = require('./config');
const catRoutes = require('./app/routes/catRoutes');
const postRoutes = require('./app/routes/postRoutes');
const userRoutes = require('./app/routes/userRoutes');
const calcRoutes = require('./app/routes/calcRoutes');

// Ustawienie portu i silnika widoków
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//routery po konfiguracji sesji
app.use('/cats', catRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/calc', calcRoutes);

// Główna strona
app.get('/', (req, res) => {
    res.render('index');
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
