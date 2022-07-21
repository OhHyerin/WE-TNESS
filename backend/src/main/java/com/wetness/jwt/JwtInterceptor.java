package com.wetness.jwt;

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

    JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        String token = request.getHeader("JWT");

        try {
            Map<String, Object> payload = jwtUtil.get(token);
            request.setAttribute("nickname", payload.get("nickname"));
            request.setAttribute("email", payload.get("email"));

        } catch (Exception e) {
            throw new Exception();
        }

        return true;
    }
}
