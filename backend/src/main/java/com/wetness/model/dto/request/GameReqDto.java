package com.wetness.model.dto.request;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Component
public class GameReqDto {
    private long roomId;
    private int[] createDate; //length 6 : Year Month Day Hour Minute Second
    private int[] terminateDate; //length 6
}
