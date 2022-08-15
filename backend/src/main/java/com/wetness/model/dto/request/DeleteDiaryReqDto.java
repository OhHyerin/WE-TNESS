package com.wetness.model.dto.request;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class DeleteDiaryReqDto {
    public String filename;
}
