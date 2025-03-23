import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import { useHistory } from 'react-router-dom';
import './Register.css'; // Import the CSS file

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', { username, password });
            history.push('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;