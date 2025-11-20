import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SearchClans from './components/SearchClans';
import Leaderboards from './components/Leaderboards';
import GoldPass from './components/GoldPass';

function App() {
    return (
        <Router>
            <div className="container">
                <header style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '2rem' }}>
                    <h1>Clash Stats</h1>
                    <nav style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
                        <Link to="/" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
                        <Link to="/search-clans" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 'bold' }}>Find Clans</Link>
                        <Link to="/leaderboards" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 'bold' }}>Leaderboards</Link>
                        <Link to="/goldpass" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 'bold' }}>Gold Pass</Link>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search-clans" element={<SearchClans />} />
                    <Route path="/leaderboards" element={<Leaderboards />} />
                    <Route path="/goldpass" element={<GoldPass />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
