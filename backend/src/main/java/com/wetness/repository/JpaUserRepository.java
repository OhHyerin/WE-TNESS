package com.wetness.repository;

import com.wetness.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class JpaUserRepository implements UserRepository {

    private final EntityManager em;

    public void save(User user) {
        em.persist(user);
    }

    public User findOne(Long id) {
        return em.find(User.class, id);
    }

    @Override
    public User findOneBySocial(int social, String socialToken) {


         return   em.createQuery("SELECT u FROM User u WHERE u.social= :social and u.socialToken = :socialToken", User.class)
                .setParameter("social", social)
                .setParameter("socialToken",socialToken)
                .getSingleResult();

    }


    public boolean existsByEmail(String email) {
        List<User> result = em.createQuery("select u from User u where u.email = :email", User.class)
                .setParameter("email", email)
                .getResultList();
        return result.isEmpty();
    }

    @Override
    public boolean existsByNickname(String nickname) {
        List<User> result = em.createQuery("select u from User u where u.nickname = :nickname", User.class)
                .setParameter("nickname", nickname)
                .getResultList();
        return result.isEmpty();
    }



}
