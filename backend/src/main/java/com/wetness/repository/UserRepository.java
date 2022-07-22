package com.wetness.repository;

import com.wetness.model.User;

import java.util.Optional;

public interface UserRepository {

    void save(User user);
    User findOne(Long userId);

    User findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    User findByNickname(String nickname);


}
