package com.wetness.model.service;

import com.wetness.db.entity.Notification;
import com.wetness.db.entity.User;
import com.wetness.db.repository.NotificationRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.model.dto.request.NotificationReqDto;
import com.wetness.model.dto.response.FollowDto;
import com.wetness.model.dto.response.NotificationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public boolean registerInviteMessage(NotificationReqDto notificationReqDto, String nickname) {
        User user = userRepository.findByNickname(nickname);
        User target = userRepository.findByNickname(notificationReqDto.getNickname());

        Notification notification = new Notification();
        notification.setReceiver(target);
        notification.setSender(user);
        notification.setNotifyDate(LocalDateTime.now());
        notification.setNotifyType("invite");
        notification.setRoomCode(notificationReqDto.getRoomCode());

        notificationRepository.save(notification);
        return true;
    }

    @Override
    public boolean registerFollowMessage(NotificationReqDto notificationReqDto, String nickname) {
        User user = userRepository.findByNickname(nickname);
        User target = userRepository.findByNickname(notificationReqDto.getNickname());

        Notification notification = new Notification();
        notification.setReceiver(target);
        notification.setSender(user);
        notification.setNotifyDate(LocalDateTime.now());
        notification.setNotifyType("follow");

        notificationRepository.save(notification);
        return true;
    }

    @Override
    public ArrayList<NotificationDto> getNotification(Long receiverId) {
        return notificationRepository.findUncheckedNotifications(receiverId);
    }

}
