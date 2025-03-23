const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name',
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'Users',
});

module.exports = User;
