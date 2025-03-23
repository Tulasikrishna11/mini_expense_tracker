const express = require('express');
const { addExpense, getExpenses, updateExpense, deleteExpense, getSpendingInsights } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addExpense);
router.get('/', authMiddleware, getExpenses);
router.put('/:id', authMiddleware, updateExpense);
router.delete('/:id', authMiddleware, deleteExpense);
router.get('/insights', authMiddleware, getSpendingInsights);

module.exports = router;