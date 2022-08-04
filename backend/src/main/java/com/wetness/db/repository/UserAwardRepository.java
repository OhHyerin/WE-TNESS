package com.wetness.db.repository;

import com.wetness.db.entity.User;
import com.wetness.db.entity.UserAward;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAwardRepository extends JpaRepository<UserAward, Long> {

    UserAward save(UserAward userAward);

}
