package com.wetness.model.service;

import com.wetness.db.entity.Award;
import com.wetness.db.entity.User;
import com.wetness.model.dto.request.NotificationReqDto;
import com.wetness.model.dto.response.NotificationDto;

import java.util.ArrayList;

public interface NotificationService {


    boolean registerInviteMessage(NotificationReqDto notificationReqDto, String nickname);

    boolean registerFollowMessage(NotificationReqDto notificationReqDto, String nickname);

    boolean registerAwardNotification(User user, Award award);

    ArrayList<NotificationDto> getNotification(Long receiverId);

    boolean checkNotification(Long userId, Long notificationId);
}
