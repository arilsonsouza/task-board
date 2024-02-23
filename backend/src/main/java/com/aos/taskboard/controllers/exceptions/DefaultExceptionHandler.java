package com.aos.taskboard.controllers.exceptions;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.aos.taskboard.controllers.ApiResponseDTO;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class DefaultExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiResponseDTO> handleException(ResourceNotFoundException e,
      HttpServletRequest request) {
    ApiResponseDTO apiResponse = new ApiResponseDTO(
        request.getRequestURI(),
        HttpStatus.NOT_FOUND.value(),
        e.getMessage(),
        false,
        null,
        LocalDateTime.now());

    return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(InsufficientAuthenticationException.class)
  public ResponseEntity<ApiResponseDTO> handleException(InsufficientAuthenticationException e,
      HttpServletRequest request) {

    ApiResponseDTO apiResponse = new ApiResponseDTO(
        request.getRequestURI(),
        HttpStatus.FORBIDDEN.value(),
        e.getMessage(),
        false,
        null,
        LocalDateTime.now());

    return new ResponseEntity<>(apiResponse, HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ApiResponseDTO> handleException(BadCredentialsException e,
      HttpServletRequest request) {

    ApiResponseDTO apiResponse = new ApiResponseDTO(
        request.getRequestURI(),
        HttpStatus.UNAUTHORIZED.value(),
        "Invalid email or password",
        false,
        null,
        LocalDateTime.now());

    return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponseDTO> handleValidationExceptions(
      MethodArgumentNotValidException ex, HttpServletRequest request) {
    Map<String, String> errors = new HashMap<>();

    ex.getBindingResult().getAllErrors().forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });

    ApiResponseDTO apiResponse = new ApiResponseDTO(
        request.getRequestURI(),
        HttpStatus.UNPROCESSABLE_ENTITY.value(),
        "Request contains invalid fields",
        false,
        new ErrorResponseDTO(errors),
        LocalDateTime.now());

    return ResponseEntity.unprocessableEntity().body(apiResponse);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponseDTO> handleException(Exception e,
      HttpServletRequest request) {

    ApiResponseDTO apiResponse = new ApiResponseDTO(
        request.getRequestURI(),
        HttpStatus.UNPROCESSABLE_ENTITY.value(),
        e.getMessage(),
        false,
        null,
        LocalDateTime.now());

    return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
