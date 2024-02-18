package com.aos.taskboard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aos.taskboard.domain.task.Task;
import com.aos.taskboard.domain.user.User;
import com.aos.taskboard.services.TaskService;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @GetMapping
  public ResponseEntity<Object> listAllTasks(@AuthenticationPrincipal User user) {
    List<Task> tasks = taskService.listAllTasksByUser(user);
    return ResponseEntity.ok().body(tasks);
  }
}
