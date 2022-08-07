package com.wetness.db.repository;

import com.wetness.db.entity.Award;
import com.wetness.db.entity.UserAward;
import com.wetness.db.entity.composite.UserAwardId;
import com.wetness.model.dto.response.AwardDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface UserAwardRepository extends JpaRepository<UserAward, UserAwardId> {

    @Query("select a.eventName as award, ua.receiveDate as receiveDate " +
            "from UserAward ua join Award a on ua.award.id = a.id where ua.user.id = :userId")
    ArrayList<AwardDto> findUserAwards(@Param("userId") Long userId);

    UserAward findByUserIdAndAwardId(Long userId, Long awardId);
}
