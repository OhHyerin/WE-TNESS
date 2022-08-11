package com.wetness.db.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data //리팩토링 필요
@Entity
@Table(name="fitness_record")
public class FitnessRecord {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Column(name="game_cnt")
    private int gameCnt;

    private double calorie;

    @Column(name="reg_date")
    private LocalDate regDate;

}
