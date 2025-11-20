import React from 'react';

const ClanInfo = ({ data }) => {
    if (!data) return null;

    return (
        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <img src={data.badgeUrls?.medium} alt={data.name} style={{ width: 64, height: 64 }} />
                <div>
                    <h2>{data.name}</h2>
                    <p>{data.tag} • Level {data.clanLevel}</p>
                </div>
            </div>

            <div className="grid">
                <div>
                    <h3>Stats</h3>
                    <p>Points: {data.clanPoints}</p>
                    <p>Versus Points: {data.clanVersusPoints}</p>
                    <p>Members: {data.members}/50</p>
                </div>
                <div>
                    <h3>War</h3>
                    <p>Win Streak: {data.warWinStreak}</p>
                    <p>Wins: {data.warWins}</p>
                    <p>Ties: {data.warTies}</p>
                    <p>Losses: {data.warLosses}</p>
                </div>
                <div>
                    <h3>Description</h3>
                    <p>{data.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ClanInfo;
