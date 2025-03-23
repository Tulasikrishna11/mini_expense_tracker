const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll({ where: { user_id: req.userId } });
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
        const newExpense = await Expense.create({ user_id: req.userId, amount, description });
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
        const expense = await Expense.findByPk(id);
        if (expense) {
            expense.amount = amount;
            expense.description = description;
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