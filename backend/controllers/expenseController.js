const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findByUserId(req.userId);
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addExpense = async (req, res) => {
    const { description, amount } = req.body;
    if (isNaN(amount)) {
        return res.status(400).json({ error: 'Amount must be a number' });
    }
    try {
        const newExpense = await Expense.create(req.userId, amount, description);
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateExpense = async (req, res) => {
    const { amount, description } = req.body;
    const { id } = req.params;
    if (isNaN(amount)) {
        return res.status(400).json({ error: 'Amount must be a number' });
    }
    try {
        const expense = await Expense.update(id, amount, description);
        res.json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await Expense.delete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};