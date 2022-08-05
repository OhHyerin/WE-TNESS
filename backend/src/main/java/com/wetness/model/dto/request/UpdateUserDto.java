package com.wetness.model.dto.request;

import com.wetness.db.entity.User;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import static com.wetness.util.InputUtil.EMAIL_REGEX;
import static com.wetness.util.InputUtil.PASSWORD_REGEX;

@Data
public class UpdateUserDto {

    private String email;
    private String nickname;
    private String addressCode;
    private String gender;
    private Double height;
    private Double weight;
}
