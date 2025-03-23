const pool = require('../config/db');

const Expense = {
    create: async (userId, amount, description) => {
        const res = await pool.query('INSERT INTO expenses (user_id, amount, description) VALUES ($1, $2, $3) RETURNING *', [userId, amount, description]);
        return res.rows[0];
    },
    findByUserId: async (userId) => {
        const res = await pool.query('SELECT * FROM expenses WHERE user_id = $1', [userId]);
        return res.rows;
    },
    update: async (id, amount, description) => {
        const res = await pool.query('UPDATE expenses SET amount = $1, description = $2 WHERE id = $3 RETURNING *', [amount, description, id]);
        return res.rows[0];
    },
    delete: async (id) => {
        await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
    }
};

module.exports = Expense;
