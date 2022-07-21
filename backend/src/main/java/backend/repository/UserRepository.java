package backend.repository;

import backend.model.User;

import java.util.Optional;

public interface UserRepository {

    void save(User user);
    User findOne(Long userId);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);
}
