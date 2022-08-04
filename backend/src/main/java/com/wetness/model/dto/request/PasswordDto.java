package com.wetness.model.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import static com.wetness.util.InputUtil.PASSWORD_REGEX;

@Data
public class PasswordDto {

    @NotBlank
    @Pattern(regexp = PASSWORD_REGEX, message = "password 형식이 올바르지 않습니다.")
    String password;
}
