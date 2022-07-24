package com.wetness.jwt;

import com.wetness.exception.UnauthorizedException;
import com.wetness.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtilImpl implements JwtUtil {

    public static final Logger logger = LoggerFactory.getLogger(JwtUtilImpl.class);

    private static final String SALT = "wetnessSecret";
    // token 유효기간 2시간
    private static final int EXPIRE_MINUTES = 1000 * 60 * 60 * 2;

    // refresh token 유효기간 일주일
    private static final int REFRESH_EXPIRE_MINUTES = 1000 * 60 * 60 * 24 * 7;

    @Override
    public String createAccessToken(User user) {

        // 헤더 생성
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("regDate", System.currentTimeMillis());
        headers.put("alg", "HS256");

        // 페이로드 생성
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("issuer", "wetness");
        payloads.put("nickname", user.getNickname());
        payloads.put("email", user.getEmail());
        //payloads.put("id",user.getId());


        String jwt = Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_MINUTES))
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
            key = SALT.getBytes("UTF-8");
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
    public Map<String, Object> get(String key) {

        Jws<Claims> claims;

        try {
            claims = Jwts.parser()
                    .setSigningKey(SALT.getBytes("UTF-8"))
                    .parseClaimsJws(key);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new UnauthorizedException();
        }
        Map<String, Object> value = claims.getBody();
        logger.info("value : {}", value);
        return value;
    }

//    @Override
//    public String getUserId() {
//        return (String) this.get("user").get("userid");
//    }

    //전달 받은 토큰이 제대로 생성된것인지 확인하고 문제가 있다면 UnauthorizedException을 발생
    @Override
    public boolean isUsable(String jwt) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(jwt);
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }
}
