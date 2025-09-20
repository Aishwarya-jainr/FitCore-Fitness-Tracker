package com.workoutplanner.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document("exercises")
public class Exercise {
  @Id private String id;
  private String name;
  private String category; // strength/cardio/mobility/other
  private List<String> primaryMuscles;
  private List<String> equipment;
  private String instructions;
  private Boolean isPublic = true;

  // getters/setters
  public String getId() { return id; } public void setId(String id) { this.id = id; }
  public String getName() { return name; } public void setName(String name) { this.name = name; }
  public String getCategory() { return category; } public void setCategory(String category) { this.category = category; }
  public List<String> getPrimaryMuscles() { return primaryMuscles; } public void setPrimaryMuscles(List<String> m) { this.primaryMuscles = m; }
  public List<String> getEquipment() { return equipment; } public void setEquipment(List<String> e) { this.equipment = e; }
  public String getInstructions() { return instructions; } public void setInstructions(String instructions) { this.instructions = instructions; }
  public Boolean getIsPublic() { return isPublic; } public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
}
