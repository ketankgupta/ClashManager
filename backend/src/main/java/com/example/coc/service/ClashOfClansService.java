package com.example.coc.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class ClashOfClansService {

    private final WebClient webClient;
    private final com.example.coc.repository.CachedDataRepository repository;

    public ClashOfClansService(WebClient webClient, com.example.coc.repository.CachedDataRepository repository) {
        this.webClient = webClient;
        this.repository = repository;
    }

    public Mono<Map> getClan(String clanTag) {
        String encodedTag = encodeTag(clanTag);
        return webClient.get()
                .uri("/clans/{tag}", encodedTag)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("CLAN_" + clanTag, "CLAN", data));
    }

    public Mono<Map> getPlayer(String playerTag) {
        String encodedTag = encodeTag(playerTag);
        return webClient.get()
                .uri("/players/{tag}", encodedTag)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("PLAYER_" + playerTag, "PLAYER", data));
    }

    public Mono<Map> getClanWarLog(String clanTag) {
        String encodedTag = encodeTag(clanTag);
        return webClient.get()
                .uri("/clans/{tag}/warlog", encodedTag)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("WARLOG_" + clanTag, "WARLOG", data));
    }

    public Mono<Map> getCurrentWar(String clanTag) {
        String encodedTag = encodeTag(clanTag);
        return webClient.get()
                .uri("/clans/{tag}/currentwar", encodedTag)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("CURRENTWAR_" + clanTag, "CURRENTWAR", data));
    }

    // --- New Clan Endpoints ---

    /**
     * Search for clans by name and other criteria.
     */
    public Mono<Map> searchClans(String name) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/clans")
                        .queryParam("name", name)
                        .build())
                .retrieve()
                .bodyToMono(Map.class);
        // Not caching search results for now as they are dynamic
    }

    /**
     * Retrieve clan members list.
     */
    public Mono<Map> getClanMembers(String clanTag) {
        String encodedTag = encodeTag(clanTag);
        return webClient.get()
                .uri("/clans/{tag}/members", encodedTag)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("MEMBERS_" + clanTag, "MEMBERS", data));
    }

    /**
     * Retrieve clan's current clan war league group.
     */
    public Mono<Map> getClanWarLeagueGroup(String clanTag) {
        String encodedTag = encodeTag(clanTag);
        return webClient.get()
                .uri("/clans/{tag}/currentwar/leaguegroup", encodedTag)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("LEAGUEGROUP_" + clanTag, "LEAGUEGROUP", data));
    }

    /**
     * Retrieve information about a specific Clan War League war.
     */
    public Mono<Map> getClanWarLeagueWar(String warTag) {
        String encodedTag = encodeTag(warTag);
        return webClient.get()
                .uri("/clanwarleagues/wars/{warTag}", encodedTag)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("WARLEAGUEWAR_" + warTag, "WARLEAGUEWAR", data));
    }

    // --- Player Endpoints ---

    /**
     * Verify player API token.
     */
    public Mono<Map> verifyPlayerToken(String playerTag, String token) {
        String encodedTag = encodeTag(playerTag);
        return webClient.post()
                .uri("/players/{tag}/verifytoken", encodedTag)
                .bodyValue(Map.of("token", token))
                .retrieve()
                .bodyToMono(Map.class);
    }

    // --- League Endpoints ---

    public Mono<Map> getLeagues() {
        return webClient.get()
                .uri("/leagues")
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("LEAGUES_ALL", "LEAGUES", data));
    }

    public Mono<Map> getLeague(String leagueId) {
        return webClient.get()
                .uri("/leagues/{leagueId}", leagueId)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("LEAGUE_" + leagueId, "LEAGUE", data));
    }

    public Mono<Map> getLeagueSeasons(String leagueId) {
        return webClient.get()
                .uri("/leagues/{leagueId}/seasons", leagueId)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("LEAGUE_SEASONS_" + leagueId, "LEAGUE_SEASONS", data));
    }

    public Mono<Map> getLeagueSeasonRankings(String leagueId, String seasonId, String type) {
        // type: "players" or "clans"
        return webClient.get()
                .uri("/leagues/{leagueId}/seasons/{seasonId}/rankings/{type}", leagueId, seasonId, type)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("LEAGUE_RANKING_" + leagueId + "_" + seasonId + "_" + type,
                        "LEAGUE_RANKING", data));
    }

    public Mono<Map> getWarLeagues() {
        return webClient.get()
                .uri("/warleagues")
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("WARLEAGUES_ALL", "WARLEAGUES", data));
    }

    public Mono<Map> getWarLeague(String leagueId) {
        return webClient.get()
                .uri("/warleagues/{leagueId}", leagueId)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("WARLEAGUE_" + leagueId, "WARLEAGUE", data));
    }

    // --- Location Endpoints ---

    public Mono<Map> getLocations() {
        return webClient.get()
                .uri("/locations")
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("LOCATIONS_ALL", "LOCATIONS", data));
    }

    public Mono<Map> getLocation(String locationId) {
        return webClient.get()
                .uri("/locations/{locationId}", locationId)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("LOCATION_" + locationId, "LOCATION", data));
    }

    public Mono<Map> getLocationRankings(String locationId, String rankingId) {
        // rankingId: "clans", "players", "clans-versus", "players-versus", "capitals"
        // Note: API paths vary slightly, mapping simplified for brevity, adjusting
        // below:
        // /locations/{locationId}/rankings/clans
        // /locations/{locationId}/rankings/players
        // /locations/{locationId}/rankings/clans-versus
        // /locations/{locationId}/rankings/players-versus
        // /locations/{locationId}/rankings/capitals
        return webClient.get()
                .uri("/locations/{locationId}/rankings/{rankingId}", locationId, rankingId)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("LOC_RANKING_" + locationId + "_" + rankingId, "LOC_RANKING", data));
    }

    // --- Gold Pass ---

    public Mono<Map> getGoldPassSeason() {
        return webClient.get()
                .uri("/goldpass/seasons/current")
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("GOLDPASS_CURRENT", "GOLDPASS", data));
    }

    // --- Labels ---

    public Mono<Map> getLabels(String type) {
        // type: "clans" or "players"
        return webClient.get()
                .uri("/labels/{type}", type)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(data -> saveCache("LABELS_" + type, "LABELS", data));
    }

    private void saveCache(String id, String type, Map data) {
        // This is a blocking call in a reactive stream, ideally we should use
        // ReactiveMongoRepository
        // But for simplicity with the current setup, we'll just fire and forget or wrap
        // it.
        // Since we are using spring-boot-starter-data-mongodb (blocking), we should be
        // careful.
        // However, for this demo, we will just execute it.
        try {
            com.example.coc.model.CachedData cached = new com.example.coc.model.CachedData(id, type, data);
            repository.save(cached);
        } catch (Exception e) {
            System.err.println("Failed to save cache: " + e.getMessage());
        }
    }

    private String encodeTag(String tag) {
        if (!tag.startsWith("#")) {
            return "#" + tag;
        }
        return tag;
    }
}
