package com.aos.taskboard.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aos.taskboard.domain.user.User;
import com.aos.taskboard.repositories.UserRepository;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public User save(User user) {
    return userRepository.save(user);
  }

  public User findByEmail(String email) {
    return userRepository.findByEmail(email).get();
  }

  public Boolean existsByEmailOrUsername(String email, String username) {
    return userRepository.existsByEmailOrUsername(email, username);
  }
}
