package com.aos.taskboard.domain.task.DTO;

import com.aos.taskboard.domain.task.Task;

public record TaskDTO(
    Long id, Long userId, String title,
    String description, String status,
    String icon) {

  public TaskDTO(Task task) {
    this(task.getId(), task.getUser().getId(), task.getTitle(), task.getDescription(), task.getStatus().name(),
        task.getIcon());
  }
}
