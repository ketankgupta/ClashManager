package com.example.coc.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Document(collection = "cached_data")
public class CachedData {

    @Id
    private String id; // e.g., "CLAN_#TAG"
    private String type; // "CLAN", "PLAYER", "WAR"
    private Map<String, Object> data;
    private LocalDateTime lastUpdated;

    public CachedData() {}

    public CachedData(String id, String type, Map<String, Object> data) {
        this.id = id;
        this.type = type;
        this.data = data;
        this.lastUpdated = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Map<String, Object> getData() { return data; }
    public void setData(Map<String, Object> data) { this.data = data; }
    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
}
