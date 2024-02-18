package com.aos.taskboard.controllers.exceptions;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ApiError(
        String path,
        String message,
        @JsonProperty("status_code") int statusCode,
        LocalDateTime localDateTime,
        Object details) {

}
