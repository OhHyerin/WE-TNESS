package com.wetness.core.queryrepository;

import com.wetness.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserQueryRepositoryImpl implements UserQueryRepository{

    private final EntityManager em;
    @Override
    public User findOneBySocial(int social, String socialToken) {



         List<User> user =  em.createQuery("SELECT u FROM User u WHERE u.social= :social and u.socialToken = :socialToken", User.class)
                .setParameter("social", Integer.toString(social))
                .setParameter("socialToken",socialToken)
                .getResultList();

        if(user.isEmpty()) return null;
        else return user.get(0);
    }
}
