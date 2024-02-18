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

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class DefaultExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiError> handleException(ResourceNotFoundException e,
      HttpServletRequest request) {
    ApiError apiError = new ApiError(
        request.getRequestURI(),
        e.getMessage(),
        HttpStatus.NOT_FOUND.value(),
        LocalDateTime.now(),
        null);

    return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(InsufficientAuthenticationException.class)
  public ResponseEntity<ApiError> handleException(InsufficientAuthenticationException e,
      HttpServletRequest request) {
    ApiError apiError = new ApiError(
        request.getRequestURI(),
        e.getMessage(),
        HttpStatus.FORBIDDEN.value(),
        LocalDateTime.now(),
        null);

    return new ResponseEntity<>(apiError, HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ApiError> handleException(BadCredentialsException e,
      HttpServletRequest request) {
    ApiError apiError = new ApiError(
        request.getRequestURI(),
        e.getMessage(),
        HttpStatus.UNAUTHORIZED.value(),
        LocalDateTime.now(),
        null);

    return new ResponseEntity<>(apiError, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Object> handleValidationExceptions(
      MethodArgumentNotValidException ex, HttpServletRequest request) {
    Map<String, String> errors = new HashMap<>();

    ex.getBindingResult().getAllErrors().forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });

    ApiError apiError = new ApiError(
        request.getRequestURI(),
        "Invalid request",
        HttpStatus.BAD_REQUEST.value(),
        LocalDateTime.now(),
        errors);

    return ResponseEntity.badRequest().body(apiError);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> handleException(Exception e,
      HttpServletRequest request) {
    ApiError apiError = new ApiError(
        request.getRequestURI(),
        e.getMessage(),
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        LocalDateTime.now(),
        null);

    return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
