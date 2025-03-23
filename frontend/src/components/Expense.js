import React from 'react';
import './Expense.css'; // Import the CSS file
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons

const Expense = ({ expense, onEdit, onDelete }) => {
    return (
        <div className="expense-card">
            <div className="expense-header">
                <div className="expense-date">{new Date(expense.date).toLocaleDateString()}</div>
                {expense.description && <div className="expense-description">{expense.description}</div>}
                <div className="expense-amount-actions">
                    <div className="expense-amount">₹{expense.amount}</div>
                    <div className="expense-actions">
                        <FaEdit className="edit-icon" onClick={() => onEdit(expense.id)} />
                        <FaTrash className="delete-icon" onClick={() => onDelete(expense.id)} />
                    </div>
                </div>
            </div>
            <div className="expense-category">{expense.category}</div>
        </div>
    );
};

export default Expense;
