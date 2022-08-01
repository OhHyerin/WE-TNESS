package com.wetness.auth.jwt;

import java.io.UnsupportedEncodingException;
import java.util.Map;
import com.wetness.db.entity.User;
import org.springframework.security.core.Authentication;

import javax.servlet.ServletException;


public interface JwtUtil{

//    String createAccessToken(User user);

    String createAccessToken(Authentication authentication);

    String createTokenForRefresh(User user);

    String createRefreshToken();

    // 토큰 유효성 검사 이후 payload 반환
    Map<String, Object> get(String key) throws ServletException, UnsupportedEncodingException;
//    String getUserId();
    boolean isUsable(String jwt);
}
