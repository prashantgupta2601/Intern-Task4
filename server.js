const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// Load config
dotenv.config();

// Passport config
require('./config/passport')(passport);

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static folder
app.use(express.static('public'));

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api', rateLimiter, require('./routes/api'));

// Protected route
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Dashboard</h1><p>Welcome, ${req.user.name}</p><img src="${req.user.avatar}" /><br><a href="/auth/logout">Logout</a>`);
  } else {
    res.redirect('/');
  }
});

// Handle 404 Errors for API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found'
  });
});

// Error Handler Middleware (Should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
