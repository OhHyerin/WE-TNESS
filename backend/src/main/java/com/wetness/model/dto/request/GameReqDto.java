package com.wetness.model.dto.request;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class GameReqDto {
    private String title;
    private int[] createDate; //length 6 : Year Month Day Hour Minute Second
}
