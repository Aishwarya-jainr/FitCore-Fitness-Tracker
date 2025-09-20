package com.workoutplanner.service;

import com.workoutplanner.model.ProgressLog;
import com.workoutplanner.repository.ProgressLogRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ProgressLogService {
  private final ProgressLogRepository repo;
  public ProgressLogService(ProgressLogRepository repo){ this.repo = repo; }

  public ProgressLog create(ProgressLog p){
    if (p.getDate() == null) p.setDate(Instant.now());
    return repo.save(p);
  }

  public List<ProgressLog> list(String ownerId, Instant from, Instant to){
    if (ownerId == null || ownerId.isBlank()) return repo.findAll();
    if (from != null && to != null)
      return repo.findByOwnerIdAndDateBetweenOrderByDateAsc(ownerId, from, to);
    return repo.findByOwnerIdOrderByDateDesc(ownerId);
  }

  public ProgressLog get(String id){ return repo.findById(id).orElse(null); }

  public ProgressLog update(String id, ProgressLog body){
    return repo.findById(id).map(existing -> {
      if (body.getOwnerId()!=null) existing.setOwnerId(body.getOwnerId());
      if (body.getDate()!=null) existing.setDate(body.getDate());
      if (body.getWeightKg()!=null) existing.setWeightKg(body.getWeightKg());
      if (body.getBodyFatPct()!=null) existing.setBodyFatPct(body.getBodyFatPct());
      if (body.getChest()!=null) existing.setChest(body.getChest());
      if (body.getWaist()!=null) existing.setWaist(body.getWaist());
      if (body.getHips()!=null) existing.setHips(body.getHips());
      if (body.getBiceps()!=null) existing.setBiceps(body.getBiceps());
      if (body.getThighs()!=null) existing.setThighs(body.getThighs());
      return repo.save(existing);
    }).orElse(null);
  }

  public boolean delete(String id){
    if (!repo.existsById(id)) return false;
    repo.deleteById(id);
    return true;
  }
}
