package com.example.coc.repository;

import com.example.coc.model.CachedData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CachedDataRepository extends MongoRepository<CachedData, String> {
}
