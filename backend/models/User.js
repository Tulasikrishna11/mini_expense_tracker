const pool = require('../config/db');

const User = {
    create: async (username, password) => {
        const res = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        return res.rows[0];
    },
    findByUsername: async (username) => {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return res.rows[0];
    },
    findById: async (id) => {
        const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.rows[0];
    },
    update: async (id, username, password) => {
        const res = await pool.query('UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *', [username, password, id]);
        return res.rows[0];
    },
};

module.exports = User;
