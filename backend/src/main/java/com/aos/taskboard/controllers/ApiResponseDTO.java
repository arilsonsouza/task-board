package com.aos.taskboard.controllers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ApiResponseDTO<T> {
    private boolean success;
    private String message;
    private T data;

    public static <T> ApiResponseDTO<T> success(T data, String message) {
        return ApiResponseDTO.<T>builder()
                .message(message)
                .data(data)
                .success(true)
                .build();
    }

    public static <T> ApiResponseDTO<T> error(T data, String message) {
        return ApiResponseDTO.<T>builder()
                .message(message)
                .data(data)
                .success(false)
                .build();
    }
}
