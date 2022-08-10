package com.wetness.model.service;

import com.wetness.model.dto.response.AwardDto;

import java.util.ArrayList;

public interface AwardService {

    void awardCheckLogin(Long userId);

    void awardCheckFollow(Long userId);

    void awardCheckMedal(Long userId);

    ArrayList<AwardDto> getAwards(Long userId);

}
