const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Expenses WHERE user_id = $1', [req.userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { amount, description } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO Expenses (user_id, amount, description) VALUES ($1, $2, $3) RETURNING *',
            [req.userId, amount, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;