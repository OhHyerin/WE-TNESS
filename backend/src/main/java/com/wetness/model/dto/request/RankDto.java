package com.wetness.model.dto.request;

import lombok.Data;

import java.util.Date;

@Data
public class RankDto {

    private boolean divideWorkout;
    private boolean divideGugun;

    private Date date;

    private long workoutId;
    private String address;

}
