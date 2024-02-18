package com.aos.taskboard.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.aos.taskboard.domain.task.DTO.TaskDTO;
import com.aos.taskboard.domain.user.User;
import com.aos.taskboard.services.TaskService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @GetMapping
  public ResponseEntity<Object> listAllTasks(@AuthenticationPrincipal User user) {
    List<TaskDTO> tasks = taskService.listAllTasksByUser(user);

    return ResponseEntity.ok().body(tasks);
  }

  @PostMapping
  public ResponseEntity<Object> createTask(@AuthenticationPrincipal User user,
      @RequestBody @Valid TaskRequestDTO data) {
    TaskDTO task = taskService.createTask(user, data);
    return ResponseEntity.ok().body(task);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> updateTask(@AuthenticationPrincipal User user, @PathVariable Long id,
      @RequestBody @Valid TaskRequestDTO data) {
    TaskDTO task = taskService.updateTask(user, id, data);
    return ResponseEntity.ok().body(task);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> updateTask(@AuthenticationPrincipal User user, @PathVariable Long id) {
    taskService.deleteTask(user, id);
    return ResponseEntity.noContent().build();
  }
}
