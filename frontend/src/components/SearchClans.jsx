import React, { useState } from 'react';
import { searchClans } from '../services/api';
import ClanInfo from './ClanInfo';

const SearchClans = () => {
    const [name, setName] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedClan, setSelectedClan] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!name) return;

        setLoading(true);
        setError(null);
        setResults(null);
        setSelectedClan(null);

        try {
            const response = await searchClans(name);
            setResults(response.data.items);
        } catch (err) {
            console.error(err);
            setError('Failed to search clans.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Search Clans</h2>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Clan Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <p style={{ color: 'var(--accent)' }}>{error}</p>}

            {results && !selectedClan && (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {results.map((clan) => (
                        <div key={clan.tag} className="card" style={{ cursor: 'pointer' }} onClick={() => setSelectedClan(clan)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={clan.badgeUrls.small} alt={clan.name} />
                                <div>
                                    <h3>{clan.name}</h3>
                                    <p style={{ opacity: 0.7 }}>{clan.tag} | Lvl {clan.clanLevel}</p>
                                    <p>{clan.members} Members | {clan.clanPoints} Points</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedClan && (
                <div>
                    <button onClick={() => setSelectedClan(null)} style={{ marginBottom: '1rem' }}>Back to Results</button>
                    <ClanInfo data={selectedClan} />
                </div>
            )}
        </div>
    );
};

export default SearchClans;
