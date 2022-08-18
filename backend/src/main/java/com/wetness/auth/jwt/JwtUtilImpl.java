package com.wetness.auth.jwt;

import com.wetness.db.entity.User;
import com.wetness.model.service.UserDetailsImpl;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtilImpl implements JwtUtil {

    public static final Logger logger = LoggerFactory.getLogger(JwtUtilImpl.class);

    //    private static final String SALT = "wetnessSecret";
    @Value("${wetness.jwt.secretKey}")
    private String jwtSecret;

    @Value("${wetness.jwt.accessTokenExpirationMs}")
    private int jwtExpirationMs;

    // token 유효기간 2시간
    private static final int EXPIRE_MINUTES = 1000 * 60 * 60 * 20;

    // refresh token 유효기간 일주일
    private static final int REFRESH_EXPIRE_MINUTES = 1000 * 60 * 60 * 24 * 7;

    @Override
    public String createAccessToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        // 헤더 생성
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("regDate", System.currentTimeMillis());
        headers.put("alg", "HS256");

        // 페이로드 생성
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("issuer", "wetness");
        payloads.put("nickname", userPrincipal.getNickname());
        payloads.put("email", userPrincipal.getEmail());


        String jwt = Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .setSubject("user")
                .signWith(SignatureAlgorithm.HS256, generateKey())
                .compact();

        return jwt;
    }

    public String createTokenForRefresh(User user) {

        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("regDate", System.currentTimeMillis());
        headers.put("alg", "HS256");

        // 페이로드 생성
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("issuer", "wetness");
        payloads.put("nickname", user.getNickname());
        payloads.put("email", user.getEmail());

        String jwt = Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .setSubject("user")
                .signWith(SignatureAlgorithm.HS256, generateKey())
                .compact();

        return jwt;
    }

    @Override
    public String createRefreshToken() {

        // 헤더 생성
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("regDate", System.currentTimeMillis());
        headers.put("alg", "HS256");

        // 페이로드 생성
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("issuer", "wetness");

        String jwt = Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRE_MINUTES))
                .setSubject("user")
                .signWith(SignatureAlgorithm.HS256, generateKey())
                .compact();

        return jwt;
    }


    private byte[] generateKey() {
        byte[] key = null;
        try {
            key = jwtSecret.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            if (logger.isInfoEnabled()) {
                e.printStackTrace();
            } else {
                logger.error("Making JWT Key Error ::: {}", e.getMessage());
            }
        }

        return key;
    }

    @Override
    public Map<String, Object> get(String key) throws ExpiredJwtException, ServletException, UnsupportedEncodingException {

        Jws<Claims> claims = null;
        Map<String, Object> payload = null;


        claims = Jwts.parser()
                .setSigningKey(jwtSecret.getBytes("UTF-8"))
                .parseClaimsJws(key);
        payload = claims.getBody();
        logger.info("payload : {}", payload);
        return payload;
    }

    //전달 받은 토큰이 제대로 생성된것인지 확인하고 문제가 있다면 UnauthorizedException을 발생
    @Override
    public boolean isUsable(String jwt) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(jwt);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
