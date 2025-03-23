import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { Pie } from 'react-chartjs-2';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [insights, setInsights] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchExpenses = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('/expenses', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setExpenses(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchInsights = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('/expenses/insights', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setInsights(response.data.insights);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchExpenses();
            await fetchInsights();
            setLoading(false);
        };
        fetchData();
    }, []);

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
        setShowForm(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowForm(false)}>&times;</span>
                        <ExpenseForm onExpenseAdded={handleExpenseAdded} />
                    </div>
                </div>
            )}
            {expenses.length === 0 ? (
                <div className="no-expenses">
                    <p>No expenses available. Please add your first expense to get started.</p>
                    <ExpenseForm onExpenseAdded={handleExpenseAdded} />
                </div>
            ) : (
                <>
                    <div className="header">
                        <button className="add-expense-button" onClick={() => setShowForm(true)}>Add Expense</button>
                    </div>
                    <ExpenseList expenses={expenses} />
                    <div className="insights-chart">
                        <h2 className="insights-heading">Spending Insights</h2>
                        <div className="chart-wrapper">
                            <Pie data={insightsData} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;