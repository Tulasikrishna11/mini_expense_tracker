import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import { useHistory, Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            history.push('/dashboard');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
    );
};

export default Login;