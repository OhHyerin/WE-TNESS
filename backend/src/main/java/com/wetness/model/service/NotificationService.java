package com.wetness.model.service;

import com.wetness.model.dto.request.NotificationReqDto;
import com.wetness.model.dto.response.NotificationDto;

import java.util.ArrayList;
import java.util.Collection;

public interface NotificationService {


    boolean registerInviteMessage(NotificationReqDto notificationReqDto, String nickname);

    boolean registerFollowMessage(NotificationReqDto notificationReqDto, String nickname);

    boolean registerAwardMessage(Long receiverId, Long awardId);

    ArrayList<NotificationDto> getNotification(Long receiverId);

    boolean checkNotification(Long userId, Long notificationId);
}
