package com.wetness.model.service;

import com.wetness.model.dto.response.AwardDto;

import java.util.ArrayList;

public interface AwardService {

    void loginAwardCheck(Long userId);

    void followAwardCheck(Long userId);

    ArrayList<AwardDto> getAwards(Long userId) ;

}
