package com.wetness.db.repository;

import com.wetness.db.entity.Notification;
import com.wetness.model.dto.response.NotificationDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("select n.id as id, n.notifyType as type, u2.nickname as sender, n.notifyDate as sendDate, n.roomCode as roomCode, n.badgeId as badge " +
            "from Notification n " +
            "join User u on n.receiver.id = u.id " +
            "join User u2 on n.sender.id = u2.id " +
            "where n.checked = false and n.receiver.id = :receiverId")
    ArrayList<NotificationDto> findUncheckedNotifications(@Param("receiverId") Long receiverId);
}
