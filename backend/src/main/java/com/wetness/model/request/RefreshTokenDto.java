package com.wetness.model.request;

import lombok.Data;

@Data
public class RefreshTokenDto {
    String nickname;
    String refreshToken;
}
