package backend.repository;

import backend.model.User;

public interface UserRepository {

    void save(User user);
    User findOne(Long userId);
}
