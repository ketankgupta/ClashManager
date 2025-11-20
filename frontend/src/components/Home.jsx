import React, { useState } from 'react';
import { getClan, getPlayer } from '../services/api';
import ClanInfo from './ClanInfo';
import PlayerProfile from './PlayerProfile';

function Home() {
    const [searchType, setSearchType] = useState('clan'); // 'clan' or 'player'
    const [tag, setTag] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!tag) return;

        setLoading(true);
        setError(null);
        setData(null);

        try {
            let result;
            if (searchType === 'clan') {
                result = await getClan(tag);
            } else {
                result = await getPlayer(tag);
            }
            setData(result);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch data. Check the tag or API key.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Search Clash of Clans</h2>
            <form onSubmit={handleSearch}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'center' }}>
                    <button
                        type="button"
                        onClick={() => setSearchType('clan')}
                        style={{ opacity: searchType === 'clan' ? 1 : 0.5 }}
                    >
                        Clan
                    </button>
                    <button
                        type="button"
                        onClick={() => setSearchType('player')}
                        style={{ opacity: searchType === 'player' ? 1 : 0.5 }}
                    >
                        Player
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder={searchType === 'clan' ? "Clan Tag (e.g. #2PP)" : "Player Tag (e.g. #L89)"}
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? '...' : 'Search'}
                    </button>
                </div>
            </form>
            {error && <p style={{ color: 'var(--accent)', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}

            {data && (
                <div style={{ marginTop: '2rem', animation: 'fadeIn 0.5s ease' }}>
                    {searchType === 'clan' ? <ClanInfo data={data} /> : <PlayerProfile data={data} />}
                </div>
            )}
        </div>
    );
}

export default Home;
