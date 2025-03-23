const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Expense extends Model {
    static async calculateSpendingInsights(userId) {
        const expenses = await this.findAll({
            where: { userId },
            attributes: [
                'category',
                [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
            ],
            group: ['category']
        });

        const totalSpending = expenses.reduce((acc, expense) => acc + parseFloat(expense.dataValues.totalAmount), 0);

        const insights = {};
        expenses.forEach(expense => {
            const category = expense.category;
            const totalAmount = parseFloat(expense.dataValues.totalAmount);
            insights[category] = {
                totalAmount,
                percentage: ((totalAmount / totalSpending) * 100).toFixed(2)
            };
        });

        return insights;
    }
}

Expense.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        field: 'user_id',
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
    },
}, {
    sequelize,
    modelName: 'Expense',
    timestamps: false,
    tableName: 'Expenses',
});

module.exports = Expense;
