package com.workoutplanner.repository;

import com.workoutplanner.model.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ExerciseRepository extends MongoRepository<Exercise, String> {
  List<Exercise> findByNameContainingIgnoreCase(String q);
}
