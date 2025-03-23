import React, { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import './ExpenseForm.css'; // Import the CSS file

const EditExpenseForm = ({ expense, onExpenseUpdated, onClose }) => {
    const [amount, setAmount] = useState(expense.amount);
    const [category, setCategory] = useState(expense.category);
    const [date, setDate] = useState(expense.date.split('T')[0]); // Ensure date is in YYYY-MM-DD format
    const [description, setDescription] = useState(expense.description);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const categories = ['Food', 'Travel', 'Entertainment', 'Health', 'Utilities', 'Other'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        try {
            await axios.put(`/expenses/${expense.id}`, { amount, category, date, description }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onExpenseUpdated();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" />
            <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Expense'}</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default EditExpenseForm;
