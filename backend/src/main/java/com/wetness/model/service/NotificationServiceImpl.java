package com.wetness.model.service;

import com.wetness.db.entity.Notification;
import com.wetness.db.entity.User;
import com.wetness.db.repository.NotificationRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.model.dto.request.NotificationReqDto;
import com.wetness.model.dto.response.NotificationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    @Override
    @Transactional
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
    @Transactional
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
    @Transactional
    public ArrayList<NotificationDto> getNotification(Long receiverId) {
        return notificationRepository.findUncheckedNotifications(receiverId);
    }

    @Override
    @Transactional
    public boolean checkNotification(Long userId, Long notificationId) {
        Optional<Notification> byId = notificationRepository.findById(notificationId);
        if (byId.isPresent()) {
            Notification notification = byId.get();
            if (notification.getReceiver().getId().equals(userId)) {
                notification.setChecked(true);
                return true;
            }
        }
        return false;
    }

}
