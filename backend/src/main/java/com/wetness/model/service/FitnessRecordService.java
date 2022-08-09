package com.wetness.model.service;

import com.wetness.db.entity.FitnessRecord;
import com.wetness.db.entity.Medal;

import java.util.List;

public interface FitnessRecordService {
    Medal getMedalRecord(String nickname);

    List<FitnessRecord> getFitnessRecord(String nickname);

    List<FitnessRecord> getWeeklyRecord(String nickname);
}
