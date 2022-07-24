package com.wetness.model.request;

import com.wetness.model.User;
import lombok.Data;

import java.util.Date;

@Data
public class JoinUserDto {
    //Essential Info
    private String email;
    private String password;
    private String pwdVerify;
    private String nickname;

    //Extra Info
    private String addressCode;
    private String gender;
    private Double height;
    private Double weight;

}
