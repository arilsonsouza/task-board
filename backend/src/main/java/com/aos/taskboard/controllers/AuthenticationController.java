package com.aos.taskboard.controllers;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aos.taskboard.controllers.exceptions.ResourceNotFoundException;
import com.aos.taskboard.domain.user.ERole;
import com.aos.taskboard.domain.user.Role;
import com.aos.taskboard.domain.user.User;
import com.aos.taskboard.domain.user.DTO.AuthenticationRequestDTO;
import com.aos.taskboard.domain.user.DTO.AuthenticationResponseDTO;
import com.aos.taskboard.domain.user.DTO.RegisterDTO;
import com.aos.taskboard.domain.user.DTO.UserDTO;
import com.aos.taskboard.infra.security.JwtTokenService;
import com.aos.taskboard.repositories.RoleRepository;
import com.aos.taskboard.repositories.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private JwtTokenService jwtTokenService;

  @PostMapping("/signin")
  public ResponseEntity<Object> signIn(@RequestBody @Valid AuthenticationRequestDTO data) {
    var usernamePasswod = new UsernamePasswordAuthenticationToken(data.email(),
        data.password());
    var auth = this.authenticationManager.authenticate(usernamePasswod);

    User user = (User) auth.getPrincipal();

    String jwtToken = jwtTokenService.generateToken(user);

    AuthenticationResponseDTO responseDTO = new AuthenticationResponseDTO(jwtToken, "Bearer", new UserDTO(user));

    return ResponseEntity.ok().body(responseDTO);
  }

  @PostMapping("/signup")
  public ResponseEntity<Object> signIn(@RequestBody @Valid RegisterDTO data) {
    if (this.userRepository.existsByEmailOrUsername(data.email(), data.username())) {
      return ResponseEntity.badRequest().build();
    }

    String encryptedPassword = encoder.encode(data.password());

    Set<Role> roles = new HashSet<>();
    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

    roles.add(userRole);

    User newUser = new User(data.username(), data.email(), encryptedPassword, roles);

    userRepository.save(newUser);
    return ResponseEntity.ok().build();
  }
}
