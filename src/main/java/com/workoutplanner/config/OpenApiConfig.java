package com.workoutplanner.config;

import io.swagger.v3.oas.models.*;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
  @Bean
  public OpenAPI api() {
    return new OpenAPI().info(new Info()
        .title("Workout Planner API")
        .description("Gym tracker backend (Users, Exercises, Sessions)")
        .version("v1"));
  }
}
