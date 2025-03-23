import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import './ExpenseForm.css'; // Import the CSS file

const ExpenseForm = ({ onExpenseAdded }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        try {
            await axios.post('/expenses', { amount, category, date, description }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAmount('');
            setCategory('');
            setDate('');
            setDescription('');
            onExpenseAdded(); // Refresh expenses and insights
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" required />
            <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Expense'}</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default ExpenseForm;
