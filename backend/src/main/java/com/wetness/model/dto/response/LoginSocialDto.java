package com.wetness.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginSocialDto {

    String existUser;
    String status;
    String code;
    String accessToken;
    String refreshToken;
}
