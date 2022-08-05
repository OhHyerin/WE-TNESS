package com.wetness.model.dto.request;

import lombok.Data;

@Data
public class NotificationReqDto {
    private Long notificationId;
    private String nickname;
    private String roomCode;
}
