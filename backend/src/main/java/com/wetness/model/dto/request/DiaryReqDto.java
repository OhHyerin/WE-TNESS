package com.wetness.model.dto.request;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class DiaryReqDto {
    private long id;
    private long userId;
    private String fileName;
    private int[] date;
    private long userGameId;
}
