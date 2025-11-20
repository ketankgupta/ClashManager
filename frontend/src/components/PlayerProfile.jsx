import React from 'react';

const PlayerProfile = ({ data }) => {
    if (!data) return null;

    return (
        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                {data.league?.iconUrls?.medium && (
                    <img src={data.league.iconUrls.medium} alt={data.league.name} style={{ width: 64, height: 64 }} />
                )}
                <div>
                    <h2>{data.name}</h2>
                    <p>{data.tag} • TH {data.townHallLevel}</p>
                </div>
            </div>

            <div className="grid">
                <div>
                    <h3>Trophies</h3>
                    <p>Current: {data.trophies}</p>
                    <p>Best: {data.bestTrophies}</p>
                    <p>War Stars: {data.warStars}</p>
                </div>
                <div>
                    <h3>Clan</h3>
                    <p>{data.clan ? `${data.clan.name} (${data.role})` : 'No Clan'}</p>
                </div>
                <div>
                    <h3>Attack Wins</h3>
                    <p>{data.attackWins}</p>
                </div>
            </div>
        </div>
    );
};

export default PlayerProfile;
