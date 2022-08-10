package com.wetness.model.dto.request;

import lombok.Data;

@Data
public class RefreshTokenDto {
    String nickname;
    String refreshToken;
}
