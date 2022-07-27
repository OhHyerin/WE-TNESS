package com.wetness.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Data
@Table(name="rank")
public class Rank {

    @Id
    @GeneratedValue
    private Long id;

    private Long userId;

    private String sedoCode;
    private String gugunCode;

    private Long workoutId;
    private Double score;
    private Timestamp date;


}
