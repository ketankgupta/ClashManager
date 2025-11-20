package com.example.coc.controller;

import com.example.coc.service.ClashOfClansService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow React app to access
public class ClashController {

    private final ClashOfClansService service;

    public ClashController(ClashOfClansService service) {
        this.service = service;
    }

    @GetMapping("/clan/{tag}")
    public Mono<Map> getClan(@PathVariable String tag) {
        return service.getClan("#" + tag);
    }

    @GetMapping("/player/{tag}")
    public Mono<Map> getPlayer(@PathVariable String tag) {
        return service.getPlayer(tag);
    }

    @GetMapping("/clan/{tag}/warlog")
    public Mono<Map> getWarLog(@PathVariable String tag) {
        return service.getClanWarLog("#" + tag);
    }

    @GetMapping("/clan/{tag}/currentwar")
    public Mono<Map> getCurrentWar(@PathVariable String tag) {
        return service.getCurrentWar("#" + tag);
    }

    // --- New Endpoints ---

    @GetMapping("/clans/search")
    public Mono<Map> searchClans(@RequestParam String name) {
        return service.searchClans(name);
    }

    @GetMapping("/clan/{tag}/members")
    public Mono<Map> getClanMembers(@PathVariable String tag) {
        return service.getClanMembers("#" + tag);
    }

    @GetMapping("/clan/{tag}/leaguegroup")
    public Mono<Map> getClanWarLeagueGroup(@PathVariable String tag) {
        return service.getClanWarLeagueGroup("#" + tag);
    }

    @GetMapping("/warleagues/wars/{warTag}")
    public Mono<Map> getClanWarLeagueWar(@PathVariable String warTag) {
        return service.getClanWarLeagueWar("#" + warTag);
    }

    @PostMapping("/player/{tag}/verifytoken")
    public Mono<Map> verifyPlayerToken(@PathVariable String tag, @RequestBody Map<String, String> body) {
        return service.verifyPlayerToken("#" + tag, body.get("token"));
    }

    @GetMapping("/leagues")
    public Mono<Map> getLeagues() {
        return service.getLeagues();
    }

    @GetMapping("/leagues/{leagueId}")
    public Mono<Map> getLeague(@PathVariable String leagueId) {
        return service.getLeague(leagueId);
    }

    @GetMapping("/leagues/{leagueId}/seasons")
    public Mono<Map> getLeagueSeasons(@PathVariable String leagueId) {
        return service.getLeagueSeasons(leagueId);
    }

    @GetMapping("/leagues/{leagueId}/seasons/{seasonId}/rankings/{type}")
    public Mono<Map> getLeagueSeasonRankings(@PathVariable String leagueId, @PathVariable String seasonId,
            @PathVariable String type) {
        return service.getLeagueSeasonRankings(leagueId, seasonId, type);
    }

    @GetMapping("/warleagues")
    public Mono<Map> getWarLeagues() {
        return service.getWarLeagues();
    }

    @GetMapping("/warleagues/{leagueId}")
    public Mono<Map> getWarLeague(@PathVariable String leagueId) {
        return service.getWarLeague(leagueId);
    }

    @GetMapping("/locations")
    public Mono<Map> getLocations() {
        return service.getLocations();
    }

    @GetMapping("/locations/{locationId}")
    public Mono<Map> getLocation(@PathVariable String locationId) {
        return service.getLocation(locationId);
    }

    @GetMapping("/locations/{locationId}/rankings/{rankingId}")
    public Mono<Map> getLocationRankings(@PathVariable String locationId, @PathVariable String rankingId) {
        return service.getLocationRankings(locationId, rankingId);
    }

    @GetMapping("/goldpass/seasons/current")
    public Mono<Map> getGoldPassSeason() {
        return service.getGoldPassSeason();
    }

    @GetMapping("/labels/{type}")
    public Mono<Map> getLabels(@PathVariable String type) {
        return service.getLabels(type);
    }
}
