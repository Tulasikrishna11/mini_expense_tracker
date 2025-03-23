import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { Pie } from 'react-chartjs-2';
import './Dashboard.css'; // Import the CSS file

const Dashboard = ({ onLogout }) => {
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

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const percentage = insights[label].percentage;
                        const totalAmount = insights[label].totalAmount;
                        return `${label}: ${percentage}% (₹${totalAmount})`;
                    }
                }
            }
        }
    };

    const handleExpenseAdded = () => {
        fetchExpenses();
        fetchInsights();
        setShowForm(false);
    };

    const totalAmount = Object.values(insights).reduce((acc, insight) => acc + insight.totalAmount, 0);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <button className="logout-button" onClick={onLogout}>Logout</button>
            </header>
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
                            <div className="chart-center">
                                <Pie data={insightsData} options={options} />
                            </div>
                        </div>
                        <div className="total-amount">
                            <h3>Total Amount: ₹{totalAmount}</h3>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;