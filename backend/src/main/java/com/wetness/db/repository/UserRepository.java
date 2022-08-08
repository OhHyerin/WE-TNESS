package com.wetness.db.repository;

import com.wetness.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User save(User user);
    User getOne(Long userId);
    Optional<User> findByEmail(String email);
    User findByNickname(String nickname);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);

    Optional<User> findBySocialAndSocialId(String social, String socialId);
}
