package com.workoutplanner.repository;

import com.workoutplanner.model.ProgressLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;

public interface ProgressLogRepository extends MongoRepository<ProgressLog, String> {
  List<ProgressLog> findByOwnerIdOrderByDateDesc(String ownerId);
  List<ProgressLog> findByOwnerIdAndDateBetweenOrderByDateAsc(String ownerId, Instant from, Instant to);
}
