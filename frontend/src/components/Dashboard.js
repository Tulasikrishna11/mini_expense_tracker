import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { Pie } from 'react-chartjs-2';
import './Dashboard.css'; // Import the CSS file

const Dashboard = ({ onLogout }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchExpenses();
            setLoading(false);
        };
        fetchData();
    }, []);

    const insightsData = {
        labels: [...new Set(filteredExpenses.map(expense => expense.category))],
        datasets: [{
            label: 'Spending Insights',
            data: [...new Set(filteredExpenses.map(expense => expense.category))].map(category => {
                return filteredExpenses
                    .filter(expense => expense.category === category)
                    .reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
            }),
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
                        const totalAmount = insightsData.datasets[0].data[context.dataIndex];
                        const totalSpending = insightsData.datasets[0].data.reduce((acc, amount) => acc + amount, 0);
                        const percentage = ((totalAmount / totalSpending) * 100).toFixed(2);
                        return `${label}: ${percentage}% (₹${totalAmount})`;
                    }
                }
            }
        }
    };

    const handleExpenseAdded = () => {
        fetchExpenses();
        setShowForm(false);
    };

    const totalAmount = filteredExpenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

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
                    <ExpenseList expenses={expenses} setFilteredExpenses={setFilteredExpenses} />
                    {filteredExpenses.length > 0 && (
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
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;