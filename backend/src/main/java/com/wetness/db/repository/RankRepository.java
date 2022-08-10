package com.wetness.db.repository;

import com.wetness.db.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RankRepository extends JpaRepository<Rank, Long> {


    //지역 구분 x, 운동 구분 x
//    List<Rank> findTop20ByDateOrderByCalorieDesc(Date date);
//    //지역 구분 x, 운동 구분 o
//    List<Rank> findTop20ByDateAndWorkoutIdOrderByCalorieDesc(Date date, int workoutId);
//    //지역 구분 o, 운동 구분 x
//    List<Rank> findTop20ByDateAndGugunCodeOrderByCalorieDesc(Date date, String gugunCode);
//    //지역 구분 o, 운동 구분 o
//    List<Rank> findTop20ByDateAndGugunCodeAndWorkoutIdOrderByCalorieDesc(Date date, String gugunCode, long workoutId);
//


    //UserId, WorkoutId, Date
    List<Rank> findByUserIdAndWorkoutIdAndDateGreaterThanEqual(long userId, int workoutId, LocalDate start);

    //UserId, Date
    List<Rank> findByUserIdAndDateGreaterThanEqual(long userId, LocalDate regDate);

    //Date
    List<Rank> findByDate(LocalDate regDate);

    List<Rank> findByGugunCodeAndDate(String gugunCode, LocalDate regDate);





}
