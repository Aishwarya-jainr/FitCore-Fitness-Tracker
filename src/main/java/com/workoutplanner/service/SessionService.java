package com.workoutplanner.service;

import com.workoutplanner.model.Session;
import com.workoutplanner.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class SessionService {
    private final SessionRepository repo;

    public SessionService(SessionRepository repo) {
        this.repo = repo;
    }

    public Session create(Session s) {
        if (s.getDate() == null) s.setDate(Instant.now());
        return repo.save(s);
    }

    public List<Session> list(String ownerId, Instant from, Instant to) {
        if (ownerId == null || ownerId.isBlank()) {
            // Fallback: list all if owner not provided (dev convenience)
            return repo.findAll();
        }
        if (from != null && to != null) {
            return repo.findByOwnerIdAndDateBetweenOrderByDateDesc(ownerId, from, to);
        }
        return repo.findByOwnerIdOrderByDateDesc(ownerId);
    }

    public Session get(String id) {
        return repo.findById(id).orElse(null);
    }

    public Session update(String id, Session body) {
        return repo.findById(id).map(existing -> {
            if (body.getOwnerId() != null) existing.setOwnerId(body.getOwnerId());
            if (body.getDate() != null) existing.setDate(body.getDate());
            if (body.getDurationMin() != null) existing.setDurationMin(body.getDurationMin());
            if (body.getNotes() != null) existing.setNotes(body.getNotes());
            if (body.getItems() != null) existing.setItems(body.getItems());
            return repo.save(existing);
        }).orElse(null);
    }

    public boolean delete(String id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
