package com.wetness.model.dto.request;

import lombok.Data;

@Data
public class UpdateUserDto {

    private String email;
    private String nickname;
    private String addressCode;
    private String gender;
    private Double height;
    private Double weight;
}
