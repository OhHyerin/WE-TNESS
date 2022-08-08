package com.wetness.model.service;

import com.wetness.db.entity.Rank;
import com.wetness.model.dto.request.RankDto;
import com.wetness.model.dto.response.RankResDto;

import java.util.List;

public interface RankService {

    RankResDto getRank(RankDto rankDto, long userId);
    RankResDto getGugunRank(RankDto rankDto, long userId);



}
