package com.aos.taskboard.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aos.taskboard.domain.user.User;
import com.aos.taskboard.domain.user.DTO.UserDTO;
import com.aos.taskboard.domain.user.DTO.UserProfileDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "User", description = "User authentication")
public class UserController {

  @GetMapping("/profile")
  @Operation(summary = "Profile", description = "Return logged user profile")
  @ApiResponses({
      @ApiResponse(responseCode = "200", useReturnTypeSchema = true)
  })
  public ResponseEntity<ApiResponseDTO<UserProfileDTO>> profile(@AuthenticationPrincipal User user) {
    UserProfileDTO responseDTO = new UserProfileDTO(new UserDTO(user));

    ApiResponseDTO<UserProfileDTO> apiResponse = ApiResponseDTO.success(responseDTO, null);

    return ResponseEntity.ok().body(apiResponse);
  }
}
