const Expense = require('../models/Expense');
const { Op } = require('sequelize');

exports.getExpenses = async (req, res) => {
    const userId = req.user.id; // Ensure this line is correct

    try {
        const expenses = await Expense.findAll({ where: { userId } });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addExpense = async (req, res) => {
    const { amount, category, date, description } = req.body;
    const userId = req.user.id; // Ensure this line is correct

    try {
        const expense = await Expense.create({ userId, amount, category, date, description });
        res.status(201).json(expense);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

exports.updateExpense = async (req, res) => {
    const { amount, description, category, date } = req.body;
    const { id } = req.params;
    if (isNaN(amount)) {
        return res.status(400).json({ error: 'Amount must be a number' });
    }
    try {
        const expense = await Expense.findByPk(id);
        if (expense) {
            expense.amount = amount;
            expense.description = description;
            expense.category = category;
            expense.date = date;
            await expense.save();
            res.json(expense);
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findByPk(id);
        if (expense) {
            await expense.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSpendingInsights = async (req, res) => {
    const userId = req.user.id;
    const insights = await Expense.calculateSpendingInsights(userId);
    res.json({ insights });
};