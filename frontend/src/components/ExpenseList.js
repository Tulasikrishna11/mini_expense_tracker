import React, { useState, useEffect } from 'react';
import Expense from './Expense';
import './ExpenseList.css'; // Import the CSS file

const ExpenseList = ({ expenses, setFilteredExpenses }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const expensesPerPage = 5;

    // Filter expenses based on category and date range
    const filteredExpenses = expenses.filter(expense => {
        const matchesCategory = categoryFilter ? expense.category === categoryFilter : true;
        const matchesStartDate = startDate ? new Date(expense.date) >= new Date(startDate) : true;
        const matchesEndDate = endDate ? new Date(expense.date) <= new Date(endDate) : true;
        return matchesCategory && matchesStartDate && matchesEndDate;
    });

    useEffect(() => {
        setFilteredExpenses(filteredExpenses);
    }, [categoryFilter, startDate, endDate, expenses, setFilteredExpenses]);

    // Calculate the current expenses to display
    const indexOfLastExpense = currentPage * expensesPerPage;
    const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
    const currentExpenses = filteredExpenses.slice(indexOfFirstExpense, indexOfLastExpense);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredExpenses.length / expensesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="expense-list">
            <h2>Expenses</h2>
            <div className="filters">
                <div className="filter-row category-filter">
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="filter-row date-filter">
                    <fieldset className="date-fieldset">
                        <legend>From</legend>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
                    </fieldset>
                    <fieldset className="date-fieldset">
                        <legend>To</legend>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
                    </fieldset>
                </div>
            </div>
            {filteredExpenses.length === 0 ? (
                <div className="no-expenses">
                    <p>No Expenses matched for the filter configuration</p>
                </div>
            ) : (
                <>
                    <div className="expenses-container">
                        {currentExpenses.map(expense => (
                            <Expense key={expense.id} expense={expense} />
                        ))}
                    </div>
                    <div className="pagination">
                        <span>Page {currentPage} of {totalPages}</span>
                        <div>
                            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ExpenseList;
