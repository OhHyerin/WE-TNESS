package com.wetness.model.dto.response;

import com.wetness.db.entity.User;
import lombok.Data;

@Data
public class UserInfoResDto {

    private String email;
    private String nickname;

    private String address;
    private String gender;
    private double height;
    private double weight;

    public static UserInfoResDto generateUserInfoResDto(User user, String address) {
        UserInfoResDto u = new UserInfoResDto();
        u.setEmail(user.getEmail());
        u.setNickname(user.getNickname());
        u.setAddress(address);
        u.setGender(user.getGender());
        u.setHeight(user.getHeight());
        u.setWeight(user.getWeight());
        return u;
    }

}
