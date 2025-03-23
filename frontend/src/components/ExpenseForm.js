import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import './ExpenseForm.css'; // Import the CSS file

const ExpenseForm = ({ onExpenseAdded }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('/expenses', { amount, description }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setAmount('');
        setDescription('');
        onExpenseAdded();
    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
