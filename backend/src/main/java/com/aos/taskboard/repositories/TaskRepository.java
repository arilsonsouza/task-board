package com.aos.taskboard.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.aos.taskboard.domain.task.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
  @Query("SELECT t FROM Task t WHERE t.user.id = :user_id ORDER BY t.createdAt")
  public List<Task> findAllByUserId(@Param("user_id") Long userId);

  public Optional<Task> findByIdAndUserId(Long id, Long userId);
}
