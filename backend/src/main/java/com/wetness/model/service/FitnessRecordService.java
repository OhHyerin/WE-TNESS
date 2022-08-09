package com.wetness.model.service;

import com.wetness.db.entity.FitnessRecord;
import com.wetness.db.entity.Medal;
import com.wetness.model.dto.response.HeatMapRespDto;
import com.wetness.model.dto.response.WeeklyRecordRespDto;

import java.util.List;

public interface FitnessRecordService {
    Medal getMedalRecord(String nickname);

    List<HeatMapRespDto> getHeatMap(String nickname);

    List<WeeklyRecordRespDto> getWeeklyRecord(String nickname);
}
