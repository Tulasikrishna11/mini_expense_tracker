import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { Pie } from 'react-chartjs-2';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Import the profile and logout icons
import './Dashboard.css'; // Import the CSS file

const Dashboard = ({ onLogout }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [username, setUsername] = useState(''); // Add state for username

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('/expenses');
            setExpenses(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get('/auth/user');
            setUsername(response.data.firstName); // Set the username
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchExpenses();
            await fetchUser(); // Fetch the user data
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
                'rgba(255, 99, 132, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(54, 162, 235, 0.8)'
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
                <div className="user-info">
                    <FaUserCircle className="profile-icon" />
                    <span className="username">{username}</span>
                    <FaSignOutAlt className="logout-icon" onClick={onLogout} />
                </div>
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
                    <div className="dashboard-content">
                        <ExpenseList
                            expenses={expenses}
                            setExpenses={setExpenses}
                            setFilteredExpenses={setFilteredExpenses}
                            onAddExpense={() => setShowForm(true)}
                        />
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
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;