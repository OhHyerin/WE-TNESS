package com.wetness.db.repository;

import com.wetness.db.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByRoomIdAndCreateDate(Long roomId, LocalDateTime createDate);
}
