# Mini Expense Tracker with Intelligent Insights

## Overview
The Mini Expense Tracker is a web application that allows users to securely authenticate, manage their expenses, and gain insights into their spending patterns. The application is built using ReactJS for the frontend and NodeJS for the backend, with PostgreSQL as the database.

## Features
- **User Authentication**: Secure JWT-based authentication with HTTP-only cookies.
- **Expense Management**: Add, update, delete, and view expenses.
- **Spending Insights**: Visualize spending patterns with charts.
- **Filters and Pagination**: Filter expenses by category and date range, with pagination support.

## Tech Stack
- **Frontend**: ReactJS
- **Backend**: NodeJS
- **Database**: PostgreSQL using Sequelize ORM

## Setup Instructions

### Backend Setup

1. **Initialize the Backend**

```bash
mkdir backend
cd backend
npm init -y
npm install express pg bcryptjs jsonwebtoken cors dotenv
```

2. **Database Configuration**

Configure the database connection in `config/db.js`.

3. **User and Expense Models**

Create the user and expense models in `models/User.js` and `models/Expense.js`.

4. **Controllers**

Implement the authentication and expense controllers in `controllers/authController.js` and `controllers/expenseController.js`.

5. **Routes**

Set up the authentication and expense routes in `routes/authRoutes.js` and `routes/expenseRoutes.js`.

6. **Middleware**

Implement the authentication middleware in `middleware/authMiddleware.js`.

### Frontend Setup

1. **Initialize the Frontend**

```bash
npx create-react-app frontend
cd frontend
npm install axios react-chartjs-2 chart.js react-icons react-router-dom
```

2. **Project Structure**

```
expense-tracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── api/
    │   ├── config/
    │   ├── styles/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Running the Application

1. **Start the Frontend**

```bash
cd frontend
npm run build
```

2. **Start the Backend**

```bash
cd backend
npm start
```

## Conclusion
This project demonstrates a full-stack web application for tracking expenses with intelligent insights. It includes user authentication, expense management, and data visualization features.
