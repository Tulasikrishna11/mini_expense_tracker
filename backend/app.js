const express = require('express');
const path = require('path');
const cors = require('cors'); // Add this line
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use(cors()); // Add this line
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

app.use(express.static(path.join(__dirname, '../frontend/build')));

module.exports = app;