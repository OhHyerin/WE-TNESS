package com.wetness.db.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "ranking")
public class Rank {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private User user;

//    @ManyToOne
//    private Workout workout;

//    private Long workoutId;

    private String sidoCode;
    private String gugunCode;

    private double calories;

//    @Temporal(TemporalType.DATE)  //년, 월, 일 저장
    private Timestamp date;

    //TODO : 생성자 생성
//    User(Long userId, String sidoCode, String gugunCode, double calories, Timestamp date){
//
//    }

}
