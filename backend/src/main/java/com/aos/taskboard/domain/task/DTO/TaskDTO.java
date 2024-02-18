package com.aos.taskboard.domain.task.DTO;

import com.aos.taskboard.domain.task.Task;
import com.fasterxml.jackson.annotation.JsonProperty;

public record TaskDTO(
    Long id, @JsonProperty("user_id") Long userId, String title,
    String description, String status,
    String icon) {

  public TaskDTO(Task task) {
    this(task.getId(), task.getUser().getId(), task.getTitle(), task.getDescription(), task.getStatus().name(),
        task.getDescription());
  }
}
