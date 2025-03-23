### Project Structure

```
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── AddExpense.js
    │   ├── App.js
    │   ├── index.js
    │   └── package.json
```

### Backend Setup

1. **Initialize the Backend**

```bash
mkdir backend
cd backend
npm init -y
npm install express pg bcryptjs jsonwebtoken cors dotenv
```

2. **Database Configuration (`config/db.js`)**

```javascript
const { Pool } = require('pg');
const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'expense_tracker',
    password: 'your_db_password',
    port: 5432,
});

module.exports = pool;
```

3. **User and Expense Models (`models/User.js` and `models/Expense.js`)**

```javascript
// models/User.js
const pool = require('../config/db');

const User = {
    create: async (username, password) => {
        const res = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        return res.rows[0];
    },
    findByUsername: async (username) => {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return res.rows[0];
    },
};

module.exports = User;

// models/Expense.js
const pool = require('../config/db');

const Expense = {
    create: async (userId, amount, description) => {
        const res = await pool.query('INSERT INTO expenses (user_id, amount, description) VALUES ($1, $2, $3) RETURNING *', [userId, amount, description]);
        return res.rows[0];
    },
    findByUserId: async (userId) => {
        const res = await pool.query('SELECT * FROM expenses WHERE user_id = $1', [userId]);
        return res.rows;
    },
};

module.exports = Expense;
```

4. **Controllers (`controllers/authController.js` and `controllers/expenseController.js`)**

```javascript
// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(username, hashedPassword);
    res.status(201).json(user);
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// controllers/expenseController.js
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    const { amount, description } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user
    const expense = await Expense.create(userId, amount, description);
    res.status(201).json(expense);
};

exports.getExpenses = async (req, res) => {
    const userId = req.user.id;
    const expenses = await Expense.findByUserId(userId);
    res.json(expenses);
};
```

5. **Routes (`routes/authRoutes.js` and `routes/expenseRoutes.js`)**

```javascript
// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;

// routes/expenseRoutes.js
const express = require('express');
const { addExpense, getExpenses } = require('../controllers/expenseController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, addExpense);
router.get('/', authenticate, getExpenses);

module.exports = router;
```

6. **Middleware (`middleware/authMiddleware.js`)**

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
};
```

7. **Server Setup (`server.js`)**

```javascript
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### Frontend Setup

1. **Initialize the Frontend**

```bash
npx create-react-app frontend
cd frontend
npm install axios react-router-dom chart.js react-chartjs-2
```

2. **App Component (`src/App.js`)**

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/" exact component={Login} />
            </Switch>
        </Router>
    );
}

export default App;
```

3. **Login Component (`src/components/Login.js`)**

```javascript
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        localStorage.setItem('token', response.data.token);
        // Redirect to dashboard
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
```

4. **Register Component (`src/components/Register.js`)**

```javascript
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/auth/register', { username, password });
        // Redirect to login
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
```

5. **Dashboard Component (`src/components/Dashboard.js`)**

```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const fetchExpenses = async () => {
        const response = await axios.get('http://localhost:5000/api/expenses', {
            headers: { Authorization: localStorage.getItem('token') },
        });
        setExpenses(response.data);
    };

    const addExpense = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/expenses', { amount, description }, {
            headers: { Authorization: localStorage.getItem('token') },
        });
        fetchExpenses();
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const data = {
        labels: expenses.map(exp => exp.description),
        datasets: [{
            label: 'Expenses',
            data: expenses.map(exp => exp.amount),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <form onSubmit={addExpense}>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <button type="submit">Add Expense</button>
            </form>
            <Bar data={data} />
        </div>
    );
};

export default Dashboard;
```

### Database Setup

1. **Create PostgreSQL Database and Tables**

```sql
CREATE DATABASE expense_tracker;

\c expense_tracker;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount DECIMAL NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Running the Application

1. **Start the Backend**

```bash
cd backend
node server.js
```

2. **Start the Frontend**

```bash
cd frontend
npm start
```

### Conclusion

This is a basic implementation of an expense tracker application using React, Node.js, and PostgreSQL. You can enhance it further by adding features like user authentication, better error handling, and styling with CSS or a UI framework like Bootstrap or Material-UI.