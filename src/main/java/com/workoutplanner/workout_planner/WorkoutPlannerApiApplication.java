package com.workoutplanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.workoutplanner")
public class WorkoutPlannerApiApplication {
  public static void main(String[] args) {
    SpringApplication.run(WorkoutPlannerApiApplication.class, args);
  }
}
