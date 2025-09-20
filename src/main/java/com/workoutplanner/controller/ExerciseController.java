package com.workoutplanner.controller;

import com.workoutplanner.model.Exercise;
import com.workoutplanner.service.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin
public class ExerciseController {
  private final ExerciseService service;
  public ExerciseController(ExerciseService service) { this.service = service; }

  @GetMapping
  public List<Exercise> list(@RequestParam(required = false) String q) { return service.list(q); }

  @GetMapping("/{id}")
  public ResponseEntity<Exercise> get(@PathVariable String id) {
    var e = service.get(id);
    return e == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(e);
  }

  @PostMapping
  public ResponseEntity<Exercise> create(@RequestBody Exercise body) {
    return ResponseEntity.status(201).body(service.create(body));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Exercise> update(@PathVariable String id, @RequestBody Exercise body) {
    var e = service.update(id, body);
    return e == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(e);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable String id) {
    return service.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
  }
}
