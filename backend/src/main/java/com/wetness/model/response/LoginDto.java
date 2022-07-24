package com.wetness.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {
    String status;
    String code;
    String accessToken;
    String refreshToken;
    UserResponseDto userInfo;
}
