package com.aos.taskboard.domain.user.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record RegisterDTO(
    @NotBlank @Min(3) @Max(20) String username,
    @NotBlank @Email String email,
    @NotBlank @Min(6) String password) {

}
