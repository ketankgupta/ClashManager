import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxied by Vite to localhost:8080
});

export const getClan = (tag) => api.get(`/clan/${tag.replace('#', '')}`);
export const getPlayer = (tag) => api.get(`/player/${tag.replace('#', '')}`);
export const getWarLog = (tag) => api.get(`/clan/${tag.replace('#', '')}/warlog`);
export const getCurrentWar = (tag) => api.get(`/clan/${tag.replace('#', '')}/currentwar`);

// New Endpoints
export const searchClans = (name) => api.get(`/clans/search?name=${name}`);
export const getClanMembers = (tag) => api.get(`/clan/${tag.replace('#', '')}/members`);
export const getClanWarLeagueGroup = (tag) => api.get(`/clan/${tag.replace('#', '')}/leaguegroup`);
export const getClanWarLeagueWar = (warTag) => api.get(`/warleagues/wars/${warTag.replace('#', '')}`);
export const verifyPlayerToken = (tag, token) => api.post(`/player/${tag.replace('#', '')}/verifytoken`, { token });

export const getLeagues = () => api.get('/leagues');
export const getLeague = (leagueId) => api.get(`/leagues/${leagueId}`);
export const getLeagueSeasons = (leagueId) => api.get(`/leagues/${leagueId}/seasons`);
export const getLeagueSeasonRankings = (leagueId, seasonId, type) => api.get(`/leagues/${leagueId}/seasons/${seasonId}/rankings/${type}`);

export const getWarLeagues = () => api.get('/warleagues');
export const getWarLeague = (leagueId) => api.get(`/warleagues/${leagueId}`);

export const getLocations = () => api.get('/locations');
export const getLocation = (locationId) => api.get(`/locations/${locationId}`);
export const getLocationRankings = (locationId, rankingId) => api.get(`/locations/${locationId}/rankings/${rankingId}`);

export const getGoldPassSeason = () => api.get('/goldpass/seasons/current');
export const getLabels = (type) => api.get(`/labels/${type}`);

export default api;
