import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leaderboard from './Leaderboard';

function AdminDashboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    // Fetch the top 10 players
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/leaderboard');
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };
        fetchLeaderboard();
    }, []);

    // Handle search by name or ID
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/player/${searchQuery}`);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Player not found:', error);
            setSearchResult(null);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            
            <div>
                <label>Search Player:</label>
                <input
                    type="text"
                    placeholder="Enter player name or ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {searchResult && (
                <div>
                    <h3>Search Result</h3>
                    <p>ID: {searchResult.id}</p>
                    <p>Name: {searchResult.name}</p>
                    <p>Score: {searchResult.score}</p>
                    <p>Rank: {searchResult.rank}</p>
                </div>
            )}

            <Leaderboard leaderboard={leaderboard} />
        </div>
    );
}

export default AdminDashboard;
