package com.workoutplanner.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "sessions")
public class Session {
    @Id
    private String id;

    private String ownerId;          // link to User.id
    private Instant date = Instant.now();
    private Integer durationMin;     // optional
    private String notes;            // optional

    private List<SessionItem> items; // exercises performed

    public static class SessionItem {
        private String exerciseId;         // link to Exercise.id
        private List<PerformedSet> sets;   // sets performed

        public String getExerciseId() { return exerciseId; }
        public void setExerciseId(String exerciseId) { this.exerciseId = exerciseId; }
        public List<PerformedSet> getSets() { return sets; }
        public void setSets(List<PerformedSet> sets) { this.sets = sets; }
    }

    public static class PerformedSet {
        private Integer reps;
        private Double weightKg;  // allow null for bodyweight
        private Double rpe;       // optional (1–10)

        public Integer getReps() { return reps; }
        public void setReps(Integer reps) { this.reps = reps; }
        public Double getWeightKg() { return weightKg; }
        public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }
        public Double getRpe() { return rpe; }
        public void setRpe(Double rpe) { this.rpe = rpe; }
    }

    // getters & setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOwnerId() { return ownerId; }
    public void setOwnerId(String ownerId) { this.ownerId = ownerId; }

    public Instant getDate() { return date; }
    public void setDate(Instant date) { this.date = date; }

    public Integer getDurationMin() { return durationMin; }
    public void setDurationMin(Integer durationMin) { this.durationMin = durationMin; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public List<SessionItem> getItems() { return items; }
    public void setItems(List<SessionItem> items) { this.items = items; }
}
