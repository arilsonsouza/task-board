package com.aos.taskboard.domain.user.DTO;

import java.util.List;
import java.util.stream.Collectors;

import com.aos.taskboard.domain.user.User;

public record UserDTO(Long id, String username, String email, List<String> roles) {
  public UserDTO(User user) {
    this(
        user.getId(),
        user.getUsername(),
        user.getEmail(),
        user.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList()));

  }
}
