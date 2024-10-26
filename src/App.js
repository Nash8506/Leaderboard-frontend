import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import PlayerDashboard from './components/PlayerDashboard';
import Leaderboard from './components/Leaderboard';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Leaderboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/player" element={<PlayerDashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;