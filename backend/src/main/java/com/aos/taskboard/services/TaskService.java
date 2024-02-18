package com.aos.taskboard.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aos.taskboard.domain.task.Task;
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
}
