import React, { useState, useEffect } from 'react';
import { getLocations, getLeagues, getLocationRankings, getLeagueSeasonRankings } from '../services/api';

const Leaderboards = () => {
    const [type, setType] = useState('locations'); // 'locations' or 'leagues'
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchItems();
    }, [type]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = type === 'locations' ? await getLocations() : await getLeagues();
            setItems(res.data.items);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleItemClick = async (item) => {
        setSelectedItem(item);
        setLoading(true);
        try {
            let res;
            if (type === 'locations') {
                res = await getLocationRankings(item.id, 'clans');
            } else {
                // For leagues, we need a season ID. Hardcoding a recent one or fetching seasons first would be better.
                // For simplicity in this demo, we might skip deep league rankings or just show basic info.
                // Let's just show location rankings for now as it's straightforward.
                res = { data: { items: [] } }; // Placeholder
            }
            setRankings(res.data.items);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Leaderboards</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <button onClick={() => { setType('locations'); setSelectedItem(null); }} disabled={type === 'locations'}>Locations</button>
                <button onClick={() => { setType('leagues'); setSelectedItem(null); }} disabled={type === 'leagues'}>Leagues</button>
            </div>

            {loading && <p>Loading...</p>}

            {!selectedItem && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                    {items.map(item => (
                        <div key={item.id} className="card" onClick={() => handleItemClick(item)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                            <h4>{item.name}</h4>
                        </div>
                    ))}
                </div>
            )}

            {selectedItem && (
                <div>
                    <button onClick={() => setSelectedItem(null)} style={{ marginBottom: '1rem' }}>Back</button>
                    <h3>{selectedItem.name} Rankings (Clans)</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Rank</th>
                                <th style={{ textAlign: 'left' }}>Name</th>
                                <th style={{ textAlign: 'left' }}>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankings.map(rank => (
                                <tr key={rank.tag}>
                                    <td>{rank.rank}</td>
                                    <td>{rank.name}</td>
                                    <td>{rank.clanPoints}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Leaderboards;
