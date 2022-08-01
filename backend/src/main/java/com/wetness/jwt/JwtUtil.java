package com.wetness.jwt;

import java.util.Map;
import com.wetness.model.User;
import org.springframework.security.core.Authentication;


public interface JwtUtil{

//    String createAccessToken(User user);

    String createAccessToken(Authentication authentication);

    String createTokenForRefresh(User user);

    String createRefreshToken();

    // 토큰 유효성 검사 이후 payload 반환
    Map<String, Object> get(String key);
//    String getUserId();
    boolean isUsable(String jwt);
}
