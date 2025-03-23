import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/expenses', {
                amount,
                category,
                date,
                description
            });
            console.log('Expense added:', response.data);
        } catch (err) {
            console.error('Error adding expense:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div>
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default AddExpense;
