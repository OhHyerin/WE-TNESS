package backend.config;

import backend.jwt.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final String[] Exclude_Paths = {"/", "/login", "/join"};

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
//        registry
//                .addInterceptor(new JwtInterceptor());
//                .addPathPatterns("/**")
//                .excludePathPatterns(Exclude_Paths);
    }
}
