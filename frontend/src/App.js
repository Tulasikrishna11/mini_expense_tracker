import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    {token ? <Redirect to="/dashboard" /> : <Login onLogin={(token) => {
                        handleLogin(token);
                        <Redirect to="/dashboard" />
                    }} />}
                </Route>
                <Route path="/register">
                    {token ? <Redirect to="/dashboard" /> : <Register onRegister={() => <Redirect to="/login" />} />}
                </Route>
                <Route path="/dashboard">
                    {token ? <Dashboard onLogout={handleLogout} /> : <Redirect to="/login" />}
                </Route>
                <Route path="/">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;