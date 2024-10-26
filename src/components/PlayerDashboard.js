import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Leaderboard from './Leaderboard';

function PlayerDashboard() {
    const { user } = useAuth(); // Get the current logged-in player info
    const [playerInfo, setPlayerInfo] = useState(null);
    const [score, setScore] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);

    // Fetch player's rank and score on mount
    useEffect(() => {
        const fetchPlayerInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/player/${user.id}`);
                setPlayerInfo(response.data);
            } catch (error) {
                console.error('Error fetching player info:', error);
            }
        };
        fetchPlayerInfo();
    }, [user.id]);

    // Fetch the top 10 leaderboard
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/leaderboard');
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };
        fetchLeaderboard();
    }, []);

    // Update player's score
    const handleScoreUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/player/update-score`, {
                id: user.id,
                score,
            });
            setPlayerInfo({ ...playerInfo, score: response.data.newScore });
            setScore('');
        } catch (error) {
            console.error('Error updating score:', error);
        }
    };

    return (
        <div className="player-dashboard">
            <h2>Player Dashboard</h2>

            {playerInfo && (
                <div>
                    <h3>Welcome, {playerInfo.name}</h3>
                    <p>Your Current Score: {playerInfo.score}</p>
                    <p>Your Rank: {playerInfo.rank}</p>
                    {playerInfo.rank <= 10 && <p>You are in the Top 10!</p>}
                </div>
            )}

            <div>
                <h3>Update Your Score</h3>
                <input
                    type="number"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="Enter new score"
                />
                <button onClick={handleScoreUpdate}>Update Score</button>
            </div>

            <Leaderboard leaderboard={leaderboard} currentUserId={user.id} />
        </div>
    );
}

export default PlayerDashboard;
