package com.wetness.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class WeeklyRecordRespDto {
    String day;
    double calorie;
    boolean login;
}
