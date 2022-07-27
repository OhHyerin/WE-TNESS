package com.wetness.core.repository;

import com.wetness.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User save(User user);
    User getOne(Long userId);
    Optional<User> findByEmail(String email);
    User findByNickname(String nickname);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
}
