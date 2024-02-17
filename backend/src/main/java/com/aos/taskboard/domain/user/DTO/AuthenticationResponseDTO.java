package com.aos.taskboard.domain.user.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AuthenticationResponseDTO(@JsonProperty("access_token") String accessToken,
    @JsonProperty("token_type") String tokenType,
    UserDTO user) {
}
