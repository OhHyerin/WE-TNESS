package com.wetness.model.dto.request;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Component
public class GameReqDto {
    private long roomId;
    private LocalDateTime createDate; //input 타입 논의
    private LocalDateTime terminateDate; //input 타입 논의
}
