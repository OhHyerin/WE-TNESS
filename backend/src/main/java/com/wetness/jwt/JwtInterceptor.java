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

    final JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        final String accessToken = request.getHeader("JWT");

        if (accessToken != null && jwtUtil.isUsable(accessToken)) {
            Map<String, Object> payload = jwtUtil.get(accessToken);
            request.setAttribute("nickname", payload.get("nickname"));
            request.setAttribute("email", payload.get("email"));
        } else {
            //TODO 에러처리 변경
            throw new RuntimeException("인증 토큰이 없습니다.");
        }
        return true;
    }
}
