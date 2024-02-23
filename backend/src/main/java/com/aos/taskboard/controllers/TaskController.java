package com.aos.taskboard.controllers;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aos.taskboard.domain.task.DTO.TaskRequestDTO;
import com.aos.taskboard.domain.task.DTO.TaskResponseDTO;
import com.aos.taskboard.domain.task.DTO.TasksDTO;
import com.aos.taskboard.domain.user.User;
import com.aos.taskboard.services.TaskService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @GetMapping
  public ResponseEntity<ApiResponseDTO> listAllTasks(@AuthenticationPrincipal User user, HttpServletRequest request) {
    TasksDTO tasks = taskService.listAllTasksByUser(user);

    ApiResponseDTO apiResponse = new ApiResponseDTO(
        request.getRequestURI(),
        HttpStatus.OK.value(),
        null,
        true,
        tasks,
        LocalDateTime.now());

    return ResponseEntity.ok().body(apiResponse);
  }

  @PostMapping
  public ResponseEntity<ApiResponseDTO> createTask(@AuthenticationPrincipal User user,
      @RequestBody @Valid TaskRequestDTO data, HttpServletRequest request) {
    TaskResponseDTO task = taskService.createTask(user, data);

    ApiResponseDTO apiResponse = new ApiResponseDTO(
        request.getRequestURI(),
        HttpStatus.CREATED.value(),
        "Task has been created",
        true,
        task,
        LocalDateTime.now());

    return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> updateTask(@AuthenticationPrincipal User user, @PathVariable Long id,
      @RequestBody @Valid TaskRequestDTO data, HttpServletRequest request) {
    TaskResponseDTO task = taskService.updateTask(user, id, data);

    ApiResponseDTO apiResponse = new ApiResponseDTO(
        request.getRequestURI(),
        HttpStatus.OK.value(),
        "Task has been updated",
        true,
        task,
        LocalDateTime.now());

    return ResponseEntity.ok().body(apiResponse);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponseDTO> updateTask(@AuthenticationPrincipal User user, @PathVariable Long id,
      HttpServletRequest request) {
    TaskResponseDTO task = taskService.deleteTask(user, id);

    ApiResponseDTO apiResponse = new ApiResponseDTO(
        request.getRequestURI(),
        HttpStatus.OK.value(),
        "Task has been deleted",
        true,
        task,
        LocalDateTime.now());

    return ResponseEntity.ok().body(apiResponse);
  }
}
