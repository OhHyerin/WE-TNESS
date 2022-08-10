package com.wetness.model.dto.response;

import java.time.LocalDateTime;

public interface NotificationDto {
    Long getId();
    String getType();
    String getSender();
    LocalDateTime getSendDate();
    String getRoomCode();
    String getBadge();
}
