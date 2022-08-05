package com.wetness.db.repository;

import com.wetness.db.entity.RoomUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {

    RoomUser findByroomIdanduserId(long roomId, long userId);
}
