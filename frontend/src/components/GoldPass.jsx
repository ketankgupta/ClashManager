import React, { useState, useEffect } from 'react';
import { getGoldPassSeason } from '../services/api';

const GoldPass = () => {
    const [season, setSeason] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSeason = async () => {
            try {
                const res = await getGoldPassSeason();
                setSeason(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSeason();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!season) return <p>No active season found.</p>;

    return (
        <div className="card" style={{ textAlign: 'center' }}>
            <h2>Gold Pass Season</h2>
            <div style={{ margin: '2rem 0' }}>
                <h3>{season.name}</h3>
                <p>Start: {new Date(season.startTime).toLocaleDateString()}</p>
                <p>End: {new Date(season.endTime).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default GoldPass;
