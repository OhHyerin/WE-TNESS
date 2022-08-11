package com.wetness.model.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class MakeRoomReq {

    @NotBlank
    private int workoutId;
    @NotBlank
    private String title;
    private String password;
}
