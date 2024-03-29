package com.aos.taskboard.controllers;

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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/tasks")
@Tag(name = "Task", description = "Tasks")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @GetMapping
  @Operation(summary = "Get tasks", description = "Get all user tasks")
  @ApiResponses({
      @ApiResponse(responseCode = "200", useReturnTypeSchema = true)
  })
  @SecurityRequirement(name = "jwt_auth")
  public ResponseEntity<ApiResponseDTO<TasksDTO>> listAllTasks(@AuthenticationPrincipal User user) {
    TasksDTO tasks = taskService.listAllTasksByUser(user);

    ApiResponseDTO<TasksDTO> apiResponse = ApiResponseDTO.success(tasks, null);

    return ResponseEntity.ok().body(apiResponse);
  }

  @PostMapping
  @Operation(summary = "Create task", description = "Create an user task")
  @ApiResponses({
      @ApiResponse(responseCode = "200", useReturnTypeSchema = true)
  })
  public ResponseEntity<ApiResponseDTO<TaskResponseDTO>> createTask(@AuthenticationPrincipal User user,
      @RequestBody @Valid TaskRequestDTO data) {
    TaskResponseDTO task = taskService.createTask(user, data);

    ApiResponseDTO<TaskResponseDTO> apiResponse = ApiResponseDTO.success(task, "Task has been created");
    return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
  }

  @PutMapping("/{id}")
  @Operation(summary = "Update task", description = "Update an user task")
  @ApiResponses({
      @ApiResponse(responseCode = "200", useReturnTypeSchema = true)
  })
  public ResponseEntity<ApiResponseDTO<TaskResponseDTO>> updateTask(@AuthenticationPrincipal User user,
      @PathVariable Long id,
      @RequestBody @Valid TaskRequestDTO data) {
    TaskResponseDTO task = taskService.updateTask(user, id, data);

    ApiResponseDTO<TaskResponseDTO> apiResponse = ApiResponseDTO.success(task, "Task has been updated");
    return ResponseEntity.ok().body(apiResponse);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete task", description = "Delete an user task")
  @ApiResponses({
      @ApiResponse(responseCode = "200", useReturnTypeSchema = true)
  })
  public ResponseEntity<ApiResponseDTO<TaskResponseDTO>> deleteTask(@AuthenticationPrincipal User user,
      @PathVariable Long id) {
    TaskResponseDTO task = taskService.deleteTask(user, id);

    ApiResponseDTO<TaskResponseDTO> apiResponse = ApiResponseDTO.success(task, "Task has been deleted");
    return ResponseEntity.ok().body(apiResponse);
  }
}
