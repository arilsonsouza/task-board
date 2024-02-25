package com.aos.taskboard.domain.user.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterDTO(
        @NotBlank String username,
        @NotBlank @Email String email,
        @NotBlank String password) {

}
