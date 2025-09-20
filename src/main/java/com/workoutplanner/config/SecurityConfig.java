package com.workoutplanner.workout_planner.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())                 // no CSRF for APIs in dev
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/**").permitAll()         // allow EVERYTHING for now
        .anyRequest().permitAll()
      )
      .httpBasic(Customizer.withDefaults())         // (doesn't matter; everything is permitted)
      .formLogin(form -> form.disable());           // disable login page
    return http.build();
  }
}
