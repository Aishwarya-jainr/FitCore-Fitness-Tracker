package com.workoutplanner.service;

import com.workoutplanner.model.User;
import com.workoutplanner.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> list() {
        return repo.findAll();
    }

    public Optional<User> get(String id) {
        return repo.findById(id);
    }

    public User create(User user) {
        return repo.save(user);
    }

    public User update(String id, User user) {
        return repo.findById(id).map(existing -> {
            existing.setUsername(user.getUsername());
            existing.setEmail(user.getEmail());
            if (user.getPassword() != null) existing.setPassword(user.getPassword());
            return repo.save(existing);
        }).orElse(null);
    }

    public boolean delete(String id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
