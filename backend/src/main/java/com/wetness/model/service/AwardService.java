package com.wetness.model.service;

import com.wetness.model.dto.response.AwardDto;

import java.util.ArrayList;

public interface AwardService {

    void awardCheckLogin(Long userId);

    void awardCheckFollow(Long userId);

    void awardCheckMedal(Long userId);

    void awardCheckWorkout(Long userId, int workoutId, double score);

    ArrayList<AwardDto> getAwards(Long userId);

}
