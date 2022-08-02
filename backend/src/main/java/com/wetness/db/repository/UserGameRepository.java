package com.wetness.db.repository;

import com.wetness.db.entity.Game;
import com.wetness.db.entity.UserGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserGameRepository extends JpaRepository<UserGame,Long> {
}
