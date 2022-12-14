package com.wetness.model.dto.request;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class GameResultReqDto {
    Long userId;
    int[] terminateDate;
    Long gameId;
    int workoutId;
    double score;
    int rank;
}
