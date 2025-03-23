import React from 'react';
import Expense from './Expense';
import './ExpenseList.css'; // Import the CSS file

const ExpenseList = ({ expenses }) => {
    return (
        <div className="expense-list">
            <h2>Expenses</h2>
            {expenses.length === 0 ? (
                <p>No expenses available. Please add some expenses to get started.</p>
            ) : (
                <div className="expenses-container">
                    {expenses.map(expense => (
                        <Expense key={expense.id} expense={expense} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
