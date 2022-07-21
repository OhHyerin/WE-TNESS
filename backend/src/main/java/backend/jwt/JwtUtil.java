package backend.jwt;

import java.util.Map;
import backend.model.User;

public interface JwtUtil{

    <T>String createToken(User user);
    Map<String, Object> get(String key);
    String getUserId();
    boolean isUsable(String jwt);
}
