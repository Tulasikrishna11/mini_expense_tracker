import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import { Link } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/auth/login', { email, password });
            onLogin(response.data.token);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Invalid credentials'); 
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                {error && <div className="error">{error}</div>}
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
};

export default Login;