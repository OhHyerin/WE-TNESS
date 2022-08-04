package com.wetness.db.repository;

import com.wetness.db.entity.Game;
import com.wetness.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByRoomAndCreateDate(Room room, LocalDateTime createDate);
    Optional<Game> findById(Long gameId);

    List<Game> findByCreateDateBeforeAndTerminateDateAfter(LocalDateTime presentTime);
}
