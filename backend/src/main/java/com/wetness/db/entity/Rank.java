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

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    private int workoutId; //여기

    @Column(name="sido_code")
    private String sidoCode;
    @Column(name="gugun_code")
    private String gugunCode;

    private double calorie;

//    @Temporal(TemporalType.DATE)  //년, 월, 일 저장
    private LocalDate date;  //임시로 타입 변환

    private Rank(RankBuilder builder){
        this.id = builder.id;
        this.user = builder.user;
        this.workoutId = builder.workoutId;
        this.sidoCode = builder.sidoCode;
        this.gugunCode = builder.gugunCode;
        this.calorie = builder.calorie;
        this.date = LocalDate.now();

    }

    public static class RankBuilder{
        private long id;
        private User user;
        private int workoutId;
        private String sidoCode;
        private String gugunCode;
        private double calorie;
        private LocalDate date;

        public RankBuilder(){}

        public RankBuilder buildUser(User user){
            this.user = user;
            return this;
        }

        public RankBuilder buildWorkoutId(int workoutId){
            this.workoutId = workoutId;
            return this;
        }

        private RankBuilder buildSidoCode(String sidoCode){
            this.sidoCode = sidoCode;
            return this;
        }

        private RankBuilder buildGugunCode(String gugunCode) {
            this.gugunCode = gugunCode;
            return this;
        }

        private RankBuilder buildCalorie(double calorie){
            this.calorie = calorie;
            return this;
        }

        public Rank getRank(){
            return new Rank(this);
        }


    }


}
