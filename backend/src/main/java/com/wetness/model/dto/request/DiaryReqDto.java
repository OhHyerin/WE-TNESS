package com.wetness.model.dto.request;

import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Data
@Component
public class DiaryReqDto {
    private MultipartFile data;
    private long userId;
    private String fileName;
    private int[] date;
    private long userGameId;
}
