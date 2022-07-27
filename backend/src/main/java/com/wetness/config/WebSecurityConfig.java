package com.wetness.config;

import com.wetness.jwt.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;

@Configuration
@EnableWebSecurity
//@EnableGlobalMethodSecurity()
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    private final
    private static final String[] Exclude_Paths =
            {"/", "/user/login", "/user/join", "/user/duplicate-email/*", "/user/duplicate-nickname/*",
             "/user/refresh"};

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry
                .addInterceptor(jwtInterceptor)
//                .addPathPatterns("/**")
                .excludePathPatterns(Exclude_Paths);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*");
    }


}
