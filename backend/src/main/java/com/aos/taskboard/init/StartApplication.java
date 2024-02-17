package com.aos.taskboard.init;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.aos.taskboard.domain.user.ERole;
import com.aos.taskboard.domain.user.Role;
import com.aos.taskboard.repositories.RoleRepository;

@Component
public class StartApplication implements CommandLineRunner {

  @Autowired
  private RoleRepository roleRepository;

  @Override
  public void run(String... args) throws Exception {
    Set<Role> roles = new HashSet<>();
    if (!roleRepository.findByName(ERole.ROLE_USER).isPresent()) {
      roles.add(new Role(ERole.ROLE_USER));
    }

    if (!roleRepository.findByName(ERole.ROLE_ADMIN).isPresent()) {
      roles.add(new Role(ERole.ROLE_ADMIN));
    }
    roleRepository.saveAll(roles);
  }

}
