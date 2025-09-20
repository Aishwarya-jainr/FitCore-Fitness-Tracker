package com.workoutplanner.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "progress_logs")
public class ProgressLog {
  @Id
  private String id;

  private String ownerId;      // User.id
  private Instant date = Instant.now();

  private Double weightKg;     // optional
  private Double bodyFatPct;   // optional

  // optional tape measurements (cm)
  private Double chest;
  private Double waist;
  private Double hips;
  private Double biceps;
  private Double thighs;

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public String getOwnerId() { return ownerId; }
  public void setOwnerId(String ownerId) { this.ownerId = ownerId; }
  public Instant getDate() { return date; }
  public void setDate(Instant date) { this.date = date; }
  public Double getWeightKg(){ return weightKg; }
  public void setWeightKg(Double weightKg){ this.weightKg = weightKg; }
  public Double getBodyFatPct(){ return bodyFatPct; }
  public void setBodyFatPct(Double bodyFatPct){ this.bodyFatPct = bodyFatPct; }
  public Double getChest(){ return chest; }
  public void setChest(Double chest){ this.chest = chest; }
  public Double getWaist(){ return waist; }
  public void setWaist(Double waist){ this.waist = waist; }
  public Double getHips(){ return hips; }
  public void setHips(Double hips){ this.hips = hips; }
  public Double getBiceps(){ return biceps; }
  public void setBiceps(Double biceps){ this.biceps = biceps; }
  public Double getThighs(){ return thighs; }
  public void setThighs(Double thighs){ this.thighs = thighs; }
}
