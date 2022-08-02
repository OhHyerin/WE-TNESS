package com.wetness.db.repository;

import com.wetness.db.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByRoomIdAndCreateDate(Long roomId, LocalDateTime createDate);
    Optional<Game> findById(Long gameId);
}
