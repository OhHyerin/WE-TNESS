package backend.jwt;

import java.util.Map;

public interface JwtRepository {

    <T>String create(String key, T data, String subject);
    Map<String, Object> get(String key);
    String getUserId();
    boolean isUsable(String jwt);
}
