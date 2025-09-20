package com.workoutplanner.controller;

import com.workoutplanner.model.Session;
import com.workoutplanner.service.SessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin
public class SessionController {
    private final SessionService service;

    public SessionController(SessionService service) {
        this.service = service;
    }

    // List sessions, optional filters: ownerId, from, to (ISO-8601)
    @GetMapping
    public List<Session> list(
            @RequestParam(required = false) String ownerId,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to
    ) {
        Instant fromTs = (from != null && !from.isBlank()) ? Instant.parse(from) : null;
        Instant toTs   = (to   != null && !to.isBlank())   ? Instant.parse(to)   : null;
        return service.list(ownerId, fromTs, toTs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Session> get(@PathVariable String id) {
        var s = service.get(id);
        return s == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(s);
    }

    @PostMapping
    public ResponseEntity<Session> create(@RequestBody Session body) {
        return ResponseEntity.status(201).body(service.create(body));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Session> update(@PathVariable String id, @RequestBody Session body) {
        var s = service.update(id, body);
        return s == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(s);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        return service.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
