package com.workoutplanner.service;

import com.workoutplanner.model.Exercise;
import com.workoutplanner.repository.ExerciseRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExerciseService {
  private final ExerciseRepository repo;
  public ExerciseService(ExerciseRepository repo) { this.repo = repo; }

  public Exercise create(Exercise e) { return repo.save(e); }
  public List<Exercise> list(String q) {
    return (q == null || q.isBlank()) ? repo.findAll() : repo.findByNameContainingIgnoreCase(q);
  }
  public Exercise get(String id) { return repo.findById(id).orElse(null); }
  public Exercise update(String id, Exercise body) {
    var ex = get(id);
    if (ex == null) return null;
    ex.setName(body.getName());
    ex.setCategory(body.getCategory());
    ex.setPrimaryMuscles(body.getPrimaryMuscles());
    ex.setEquipment(body.getEquipment());
    ex.setInstructions(body.getInstructions());
    ex.setIsPublic(body.getIsPublic());
    return repo.save(ex);
  }
  public boolean delete(String id) {
    if (!repo.existsById(id)) return false;
    repo.deleteById(id);
    return true;
  }
}
