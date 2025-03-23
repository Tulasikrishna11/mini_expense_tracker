import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import { Link, useHistory } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await axios.post('/auth/register', { firstName, lastName, email, password });
            history.push('/login'); // Redirect to login page after successful registration
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError('User is already registered');
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
                {error && <div className="error">{error}</div>}
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default Register;