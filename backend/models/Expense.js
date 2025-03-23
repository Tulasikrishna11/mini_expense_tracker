const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const Expense = sequelize.define('Expense', {
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'amount',
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'description',
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'Expenses',
});

Expense.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Expense;
