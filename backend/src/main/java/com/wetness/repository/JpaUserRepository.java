//package com.wetness.repository;
//
//import com.wetness.model.User;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Repository;
//
//import javax.persistence.EntityManager;
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//@RequiredArgsConstructor
//public class JpaUserRepository implements UserRepository {
//
//    private final EntityManager em;
//
//    public void save(User user) {
//        em.persist(user);
//    }
//
//    public User findOne(Long id) {
//        return em.find(User.class, id);
//    }
//
//    @Override
//    public User findOneBySocial(int social, String socialToken) {
//
//
//         List<User> user =  em.createQuery("SELECT u FROM User u WHERE u.social= :social and u.socialToken = :socialToken", User.class)
//                .setParameter("social", Integer.toString(social))
//                .setParameter("socialToken",socialToken)
//                .getResultList();
//
//        if(user.isEmpty()) return null;
//        else return user.get(0);
//    }
//
//
//    @Override
//    public User findByEmail(String email) {
//        User user = em.createQuery("select u from User u where u.email = :email", User.class)
//                .setParameter("email", email)
//                .getResultList().get(0);
//        return user;
//    }
//
//    public boolean existsByEmail(String email) {
//        List<User> result = em.createQuery("select u from User u where u.email = :email", User.class)
//                .setParameter("email", email)
//                .getResultList();
//        return result.isEmpty();
//    }
//
//    @Override
//    public boolean existsByNickname(String nickname) {
//        List<User> result = em.createQuery("select u from User u where u.nickname = :nickname", User.class)
//                .setParameter("nickname", nickname)
//                .getResultList();
//        return result.isEmpty();
//    }
//
//    @Override
//    public User findByNickname(String nickname) {
//        User result = em.createQuery("select u from User u where u.nickname = :nickname", User.class)
//                .setParameter("nickname", nickname)
//                .getResultList().get(0);
//        return result;
//    }
//
//
//}
