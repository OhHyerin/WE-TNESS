package com.wetness.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Component;


@Data
@Component
public class TerminateGameDto {
    long gameId;
    int[] terminateDate;
    public TerminateGameDto(){}
}
