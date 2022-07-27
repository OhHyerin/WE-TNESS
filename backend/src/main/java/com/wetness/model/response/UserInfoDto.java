package com.wetness.model.response;

import com.wetness.model.User;
import lombok.Data;

import java.util.Date;

@Data
public class UserInfoDto {

    private String email;
    private String nickname;

    private String sidoCode;
    private String gugunCode;

    private String gender;
    private double height;
    private double weight;

    public static UserInfoDto generateUserInfoDto(User user) {
        UserInfoDto u = new UserInfoDto();
        u.setEmail(user.getEmail());
        u.setNickname(user.getNickname());
        u.setSidoCode(user.getSidoCode());
        u.setGugunCode(user.getGugunCode());
        u.setGender(user.getGender());
        u.setHeight(user.getHeight());
        u.setWeight(user.getWeight());
        return u;
    }

}
