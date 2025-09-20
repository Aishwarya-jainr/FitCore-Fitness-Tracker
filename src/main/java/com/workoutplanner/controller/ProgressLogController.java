package com.workoutplanner.controller;

import com.workoutplanner.model.ProgressLog;
import com.workoutplanner.service.ProgressLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin
public class ProgressLogController {
  private final ProgressLogService service;
  public ProgressLogController(ProgressLogService service){ this.service = service; }

  @GetMapping
  public List<ProgressLog> list(
      @RequestParam(required = false) String ownerId,
      @RequestParam(required = false) String from,
      @RequestParam(required = false) String to
  ){
    Instant f = (from!=null && !from.isBlank()) ? Instant.parse(from) : null;
    Instant t = (to!=null && !to.isBlank()) ? Instant.parse(to) : null;
    return service.list(ownerId, f, t);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ProgressLog> get(@PathVariable String id){
    var p = service.get(id);
    return p==null ? ResponseEntity.notFound().build() : ResponseEntity.ok(p);
  }

  @PostMapping
  public ResponseEntity<ProgressLog> create(@RequestBody ProgressLog body){
    return ResponseEntity.status(201).body(service.create(body));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ProgressLog> update(@PathVariable String id, @RequestBody ProgressLog body){
    var p = service.update(id, body);
    return p==null ? ResponseEntity.notFound().build() : ResponseEntity.ok(p);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable String id){
    return service.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
  }
}
