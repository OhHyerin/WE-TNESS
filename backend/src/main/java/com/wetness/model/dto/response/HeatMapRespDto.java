package com.wetness.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class HeatMapRespDto {
    int count;
    LocalDate date;
}
