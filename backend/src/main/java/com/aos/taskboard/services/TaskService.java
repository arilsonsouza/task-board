package com.aos.taskboard.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aos.taskboard.controllers.exceptions.ResourceNotFoundException;
import com.aos.taskboard.domain.task.Task;
import com.aos.taskboard.domain.task.DTO.TaskRequestDTO;
import com.aos.taskboard.domain.task.DTO.TaskResponseDTO;
import com.aos.taskboard.domain.task.DTO.TasksDTO;
import com.aos.taskboard.domain.task.DTO.TaskDTO;
import com.aos.taskboard.domain.user.User;
import com.aos.taskboard.repositories.TaskRepository;

@Service
public class TaskService {

  @Autowired
  private TaskRepository taskRepository;

  public TasksDTO listAllTasksByUser(User user) {
    List<Task> tasks = taskRepository.findAllByUserId(user.getId());

    List<TaskDTO> tasksResult = tasks.stream().map(TaskDTO::new).collect(Collectors.toList());

    return new TasksDTO(tasksResult);
  }

  public TaskResponseDTO createTask(User user, TaskRequestDTO data) {
    Task task = Task.builder()
        .user(user)
        .title(data.title())
        .description(data.description())
        .status(data.status())
        .icon(data.icon())
        .build();

    taskRepository.saveAndFlush(task);
    return new TaskResponseDTO(task);
  }

  public TaskResponseDTO updateTask(User user, Long taskId, TaskRequestDTO data) {
    Task task = taskRepository.findByIdAndUserId(taskId, user.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

    task.setTitle(data.title());
    task.setDescription(data.description());
    task.setStatus(data.status());
    task.setIcon(data.icon());

    taskRepository.saveAndFlush(task);
    return new TaskResponseDTO(task);
  }

  public TaskResponseDTO deleteTask(User user, Long taskId) {
    Task task = taskRepository.findByIdAndUserId(taskId, user.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

    taskRepository.delete(task);
    return new TaskResponseDTO(task);
  }
}
