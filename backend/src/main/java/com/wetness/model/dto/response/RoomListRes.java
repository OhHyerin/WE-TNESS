package com.wetness.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class RoomListRes {
    private int workoutId;
    private String title;
    private boolean isLocked;
    private int headcount;
    private String managerNickname;
    private boolean isGaming;

}
