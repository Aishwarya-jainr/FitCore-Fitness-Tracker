package com.workoutplanner.repository;

import com.workoutplanner.model.Session;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;

public interface SessionRepository extends MongoRepository<Session, String> {
    List<Session> findByOwnerIdOrderByDateDesc(String ownerId);
    List<Session> findByOwnerIdAndDateBetweenOrderByDateDesc(String ownerId, Instant from, Instant to);
}
