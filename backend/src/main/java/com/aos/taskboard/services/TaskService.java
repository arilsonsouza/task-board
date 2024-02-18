package com.aos.taskboard.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aos.taskboard.domain.task.Task;
import com.aos.taskboard.domain.user.User;
import com.aos.taskboard.repositories.TaskRepository;

@Service
public class TaskService {

  @Autowired
  private TaskRepository taskRepository;

  public List<Task> listAllTasksByUser(User user) {
    return taskRepository.findAllByUserId(user.getId());
  }
}
