package com.aos.taskboard.controllers.exceptions;

import java.util.Map;

public record ErrorResponseDTO(Map<String, String> errors) {

}
