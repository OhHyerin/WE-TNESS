package com.wetness.model.dto.request;

import java.time.LocalDateTime;
import java.util.Date;

public class GameReqDto {
    private long roomId;
    private LocalDateTime createDate; //input 타입 논의
    private LocalDateTime terminateDate; //input 타입 논의
}
