import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import ExpenseForm from './ExpenseForm';
import { Bar, Pie } from 'react-chartjs-2';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [insights, setInsights] = useState({});

    const fetchExpenses = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('/expenses', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
    };

    const fetchInsights = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('/expenses/insights', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setInsights(response.data.insights);
    };

    useEffect(() => {
        fetchExpenses();
        fetchInsights();
    }, []);

    const data = {
        labels: expenses.map(exp => exp.description),
        datasets: [{
            label: 'Expenses',
            data: expenses.map(exp => exp.amount),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    const insightsData = {
        labels: Object.keys(insights),
        datasets: [{
            label: 'Spending Insights',
            data: Object.values(insights).map(insight => insight.totalAmount),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
        }],
    };

    const handleExpenseAdded = () => {
        fetchExpenses();
        fetchInsights();
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
            <Bar data={data} />
            <Pie data={insightsData} />
        </div>
    );
};

export default Dashboard;