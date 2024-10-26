import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Send login credentials to the backend
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            
            // Set user information in the context
            setUser(response.data.user);

            // Redirect based on user role
            if (response.data.user.role === 'admin') {
                navigate('/admin-dashboard');
            } else if (response.data.user.role === 'player') {
                navigate('/player-dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid login credentials.');
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
