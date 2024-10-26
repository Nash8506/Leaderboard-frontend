import React from 'react';

function Leaderboard({ leaderboard, currentUserId }) {
    return (
        <div className="leaderboard">
            <h3>Top 10 Leaderboard</h3>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((player, index) => (
                        <tr
                            key={player.id}
                            style={{
                                fontWeight: player.id === currentUserId ? 'bold' : 'normal',
                                color: player.id === currentUserId ? 'blue' : 'black',
                            }}
                        >
                            <td>{index + 1}</td>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
