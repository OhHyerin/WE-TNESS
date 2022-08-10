package com.wetness.db.repository;

import com.wetness.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Room save(Room room);

}
