package com.wetness.db.repository;

import com.wetness.db.entity.GameRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRecordRepository extends JpaRepository<GameRecord,Long> {
}
