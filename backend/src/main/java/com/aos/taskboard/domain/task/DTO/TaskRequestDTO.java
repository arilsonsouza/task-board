package com.aos.taskboard.domain.task.DTO;

import com.aos.taskboard.domain.task.EStatus;

import jakarta.validation.constraints.NotBlank;

public record TaskRequestDTO(@NotBlank(message = "Title is required") String title,
        @NotBlank(message = "Description is required") String description, EStatus status,
        @NotBlank(message = "Icon is required") String icon) {
}
