package com.wetness.repository;

import com.wetness.model.User;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class SpringDataJpaUserRepository implements UserRepository{

    private static Map<Long, User> store = new HashMap<>();
    private static long sequence = 0L;

    @Override
    public void save(User user) {
        store.put(user.getId(), user);
    }

    @Override
    public User findOne(Long userId) {
        return Optional.ofNullable(store.get(userId));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return store.values().stream()
                .filter(user -> user.getEmail().equals(email))
                .findAny();
    }

    @Override
    public Optional<User> findByNickname(String nickname) {
        return store.values().stream()
                .filter(user -> user.getNickname().equals(nickname))
                .findAny();
    }
}
