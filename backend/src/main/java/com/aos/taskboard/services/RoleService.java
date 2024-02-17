package com.aos.taskboard.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aos.taskboard.domain.user.ERole;
import com.aos.taskboard.domain.user.Role;
import com.aos.taskboard.repositories.RoleRepository;

@Service
public class RoleService {
  @Autowired
  private RoleRepository roleRepository;

  public Role findByName(ERole role) {
    return roleRepository.findByName(role)
        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
  }
}
