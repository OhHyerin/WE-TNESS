package com.wetness.db.repository;

import com.wetness.db.entity.Rank;
import com.wetness.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

public interface RankRepository extends JpaRepository<Rank, Long> {

    List<Rank> findTop20ByDateOrderByCalorieDesc(Date date);





}
