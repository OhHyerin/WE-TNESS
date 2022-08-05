package com.wetness.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RankRepository extends JpaRepository<Rank, Long> {


    //지역 구분 x, 운동 구분 x
    List<Rank> findTop20ByDateOrderByCalorieDesc(Date date);
    //지역 구분 x, 운동 구분 o
    List<Rank> findTop20ByDateAndWorkoutIdOrderByCalorieDesc(Date date, long workoutId);
    //지역 구분 o, 운동 구분 x
    List<Rank> findTop20ByDateAndGugunCodeOrderByCalorieDesc(Date date, String gugunCode);
    //지역 구분 o, 운동 구분 o
    List<Rank> findTop20ByDateAndGugunCodeAndWorkoutIdOrderByCalorieDesc(Date date, String gugunCode, long workoutId);



    Optional<Rank> findByUserIdAndWorkoutAndDateGreaterThanEqual(long userId, int workoutId, LocalDate start);

    List<Rank> findByUserIdAndDateGreaterThanEqual(long userId, LocalDate regDate);




}
