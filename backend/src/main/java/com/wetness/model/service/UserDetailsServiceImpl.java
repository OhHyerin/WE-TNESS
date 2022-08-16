package com.wetness.model.service;

import com.wetness.db.repository.UserRepository;
import com.wetness.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException(email + "의 이메일을 가진유저가 없습니다"));

        UserDetailsImpl result = UserDetailsImpl.build(user);
        result.setAuthorities(Arrays.asList(new SimpleGrantedAuthority(user.getRole())));

        return result;
    }

}
