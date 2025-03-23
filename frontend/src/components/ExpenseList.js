import React, { useState } from 'react';
import Expense from './Expense';
import './ExpenseList.css'; // Import the CSS file

const ExpenseList = ({ expenses }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const expensesPerPage = 5;

    // Calculate the current expenses to display
    const indexOfLastExpense = currentPage * expensesPerPage;
    const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
    const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

    // Calculate the total number of pages
    const totalPages = Math.ceil(expenses.length / expensesPerPage);

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
            {currentExpenses.length === 0 ? (
                <p>No expenses available. Please add some expenses to get started.</p>
            ) : (
                <div className="expenses-container">
                    {currentExpenses.map(expense => (
                        <Expense key={expense.id} expense={expense} />
                    ))}
                </div>
            )}
            <div className="pagination">
                <span style={{ float: 'left' }}>Page {currentPage} of {totalPages}</span>
                <div style={{ float: 'right' }}>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default ExpenseList;
