package com.wetness.jwt;

import com.wetness.exception.NoJwtTokenException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {

    final JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        final String accessToken = request.getHeader("access-token");

        if (accessToken == null) {
            throw new NoJwtTokenException();
        }

        if (jwtUtil.isUsable(accessToken)) {
            Map<String, Object> payload = jwtUtil.get(accessToken);
            request.setAttribute("nickname", payload.get("nickname"));
            request.setAttribute("email", payload.get("email"));
            return true;
        }

        return false;
    }
}
