package com.aos.taskboard.domain.task.DTO;

import com.aos.taskboard.domain.task.Task;

public record TaskResponseDTO(TaskDTO task) {
  public TaskResponseDTO(Task task) {
    this(new TaskDTO(task));
  }
}
