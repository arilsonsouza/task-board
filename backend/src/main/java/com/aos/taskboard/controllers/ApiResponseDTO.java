package com.aos.taskboard.controllers;

import java.time.LocalDateTime;

public record ApiResponseDTO(
    String path,
    int statusCode,
    String message,
    Boolean success,
    Object data,
    LocalDateTime localDateTime) {

}
