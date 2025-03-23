import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import { useHistory } from 'react-router-dom';
import './Register.css'; // Import the CSS file

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', { firstName, lastName, email, password });
            history.push('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;