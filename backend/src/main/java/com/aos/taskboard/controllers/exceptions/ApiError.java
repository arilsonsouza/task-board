package com.aos.taskboard.controllers.exceptions;

import java.time.LocalDateTime;

public record ApiError(String path,
    String message,
    int statusCode,
    LocalDateTime localDateTime) {

}
