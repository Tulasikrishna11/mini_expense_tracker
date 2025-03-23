const express = require('express');
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', expenseController.getExpenses);
router.post('/', expenseController.addExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;