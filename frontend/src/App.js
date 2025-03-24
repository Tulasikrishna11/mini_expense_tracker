import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import axios from './config/axiosConfig';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                await axios.get('/auth/user');
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuthStatus();
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout');
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    {isAuthenticated ? <Redirect to="/dashboard" /> : <Login onLogin={handleLogin} />}
                </Route>
                <Route path="/register">
                    {isAuthenticated ? <Redirect to="/dashboard" /> : <Register />}
                </Route>
                <Route path="/dashboard">
                    {isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Redirect to="/login" />}
                </Route>
                <Route path="/">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;