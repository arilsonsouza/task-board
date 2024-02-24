package com.aos.taskboard.controllers;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aos.taskboard.domain.user.ERole;
import com.aos.taskboard.domain.user.Role;
import com.aos.taskboard.domain.user.User;
import com.aos.taskboard.domain.user.DTO.AuthenticationRequestDTO;
import com.aos.taskboard.domain.user.DTO.AuthenticationResponseDTO;
import com.aos.taskboard.domain.user.DTO.RegisterDTO;
import com.aos.taskboard.domain.user.DTO.UserDTO;
import com.aos.taskboard.infra.security.JwtTokenService;
import com.aos.taskboard.services.RoleService;
import com.aos.taskboard.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  private UserService userService;

  @Autowired
  private RoleService roleService;

  @Autowired
  private JwtTokenService jwtTokenService;

  @PostMapping("/signin")
  public ResponseEntity<ApiResponseDTO<AuthenticationResponseDTO>> signIn(
      @RequestBody @Valid AuthenticationRequestDTO data,
      HttpServletRequest request) {
    var usernamePasswod = new UsernamePasswordAuthenticationToken(data.email(),
        data.password());
    var auth = this.authenticationManager.authenticate(usernamePasswod);

    User user = (User) auth.getPrincipal();

    String jwtToken = jwtTokenService.generateToken(user);

    AuthenticationResponseDTO responseDTO = new AuthenticationResponseDTO(jwtToken, "Bearer", new UserDTO(user));

    ApiResponseDTO<AuthenticationResponseDTO> apiResponse = ApiResponseDTO.success(responseDTO,
        "User logged successfully");

    return ResponseEntity.ok().body(apiResponse);
  }

  @PostMapping("/signup")
  public ResponseEntity<ApiResponseDTO<Object>> signIn(@RequestBody @Valid RegisterDTO data,
      HttpServletRequest request) {
    if (userService.existsByEmailOrUsername(data.email(), data.username())) {

      ApiResponseDTO<Object> apiResponse = ApiResponseDTO.error(null, "User already exists");

      return ResponseEntity.badRequest().body(apiResponse);
    }

    String encryptedPassword = encoder.encode(data.password());

    Set<Role> roles = new HashSet<>();
    Role userRole = roleService.findByName(ERole.ROLE_USER);

    roles.add(userRole);

    User newUser = new User(data.username(), data.email(), encryptedPassword, roles);

    userService.save(newUser);

    ApiResponseDTO<Object> apiResponse = ApiResponseDTO.success(null, "User registered successfully");

    return ResponseEntity.ok().body(apiResponse);
  }
}
