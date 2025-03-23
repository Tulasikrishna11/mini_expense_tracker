const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    const { amount, description } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user
    const expense = await Expense.create(userId, amount, description);
    res.status(201).json(expense);
};

exports.getExpenses = async (req, res) => {
    const userId = req.user.id;
    const expenses = await Expense.findByUserId(userId);
    res.json(expenses);
};

exports.updateExpense = async (req, res) => {
    const { amount, description } = req.body;
    const { id } = req.params;
    const expense = await Expense.update(id, amount, description);
    res.json(expense);
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    await Expense.delete(id);
    res.status(204).send();
};