import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import ExpenseForm from './ExpenseForm';
import { Bar } from 'react-chartjs-2';
import ExpenseChart from './ExpenseChart';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('/expenses', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const data = {
        labels: expenses.map(exp => exp.description),
        datasets: [{
            label: 'Expenses',
            data: expenses.map(exp => exp.amount),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    const sampleData = [
        { category: 'Food', amount: 200 },
        { category: 'Transport', amount: 100 },
        { category: 'Entertainment', amount: 150 },
    ];

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <ExpenseForm onExpenseAdded={fetchExpenses} />
            <Bar data={data} />
            <ExpenseChart data={sampleData} />
        </div>
    );
};

export default Dashboard;