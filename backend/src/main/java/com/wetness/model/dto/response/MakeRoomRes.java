package com.wetness.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MakeRoomRes {

    //session id 및 유저 토큰 들어가있음
    private String token;

}
