package com.wetness.repository;

import com.wetness.model.User;

public interface UserRepository {

    void save(User user);
    User findOne(Long userId);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);


}
