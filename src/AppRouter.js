import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlayerDashboard from './components/PlayerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';

function AppRouter() {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/player-dashboard"
                    element={user && user.role === 'player' ? <PlayerDashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/admin-dashboard"
                    element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
