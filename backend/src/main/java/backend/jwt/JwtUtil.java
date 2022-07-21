package backend.jwt;

import java.util.Map;
import backend.model.User;
import org.springframework.stereotype.Component;


public interface JwtUtil{

    <T> String createToken(User user);
    // 토큰 유효성 검사 이후 payload 반환
    Map<String, Object> get(String key);
//    String getUserId();
//    boolean isUsable(String jwt);
}
