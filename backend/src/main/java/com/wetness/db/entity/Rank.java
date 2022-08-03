package com.wetness.db.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "ranking")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Rank {

    @Id @GeneratedValue
    private Long id;

//    @ManyToOne
//    private User user;
    private long userId;
//    @ManyToOne
//    private Workout workout;
    private long workoutId;


    private String sidoCode;
    private String gugunCode;

    private double calorie;

//    @Temporal(TemporalType.DATE)  //년, 월, 일 저장
    private Date date;

    public Rank(long userId, long workoutId, String sidoCode, String gugunCode, long calorie){
        this.userId = userId;
        this.workoutId = workoutId;
        this.gugunCode = gugunCode;
        this.sidoCode = sidoCode;
        this.calorie = calorie;

//        this.date =
    }

}
