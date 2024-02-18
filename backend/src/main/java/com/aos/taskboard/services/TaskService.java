package com.aos.taskboard.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aos.taskboard.controllers.exceptions.ResourceNotFoundException;
import com.aos.taskboard.domain.task.Task;
import com.aos.taskboard.domain.task.DTO.TaskRequestDTO;
import com.aos.taskboard.domain.task.DTO.TaskDTO;
import com.aos.taskboard.domain.user.User;
import com.aos.taskboard.repositories.TaskRepository;

@Service
public class TaskService {

  @Autowired
  private TaskRepository taskRepository;

  public List<TaskDTO> listAllTasksByUser(User user) {
    List<Task> tasks = taskRepository.findAllByUserId(user.getId());

    return tasks.stream().map(TaskDTO::new).collect(Collectors.toList());
  }

  public TaskDTO createTask(User user, TaskRequestDTO data) {
    Task task = Task.builder()
        .user(user)
        .title(data.title())
        .description(data.description())
        .status(data.status())
        .icon(data.icon())
        .build();

    taskRepository.saveAndFlush(task);
    return new TaskDTO(task);
  }

  public TaskDTO updateTask(User user, Long taskId, TaskRequestDTO data) {
    Task task = taskRepository.findByIdAndUserId(taskId, user.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

    task.setTitle(data.title());
    task.setDescription(data.description());
    task.setStatus(data.status());
    task.setIcon(data.icon());

    taskRepository.saveAndFlush(task);
    return new TaskDTO(task);
  }

  public void deleteTask(User user, Long taskId) {
    Task task = taskRepository.findByIdAndUserId(taskId, user.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

    taskRepository.delete(task);
  }
}
