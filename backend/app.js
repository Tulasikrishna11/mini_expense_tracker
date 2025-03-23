const express = require('express');
const path = require('path');
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); // Add this line
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use(cors()); 
app.use(express.json());
app.use(cookieParser()); // Add this line

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

module.exports = app;