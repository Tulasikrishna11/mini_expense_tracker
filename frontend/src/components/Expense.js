import React from 'react';
import './Expense.css'; // Import the CSS file
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons

const Expense = ({ expense, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="expense-card">
            <div className="expense-header">
                <div className="expense-date">{formatDate(expense.date)}</div>
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
