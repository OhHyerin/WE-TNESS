package com.wetness.db.repository;

import com.wetness.db.entity.Award;
import com.wetness.db.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AwardRepository extends JpaRepository<Award, Long> {

    Award findByEventName(String eventName);

}
