package com.wetness.model.service;

import com.wetness.db.entity.Rank;
import com.wetness.model.dto.request.RankDto;

import java.util.List;

public interface RankService {

    List<Rank> getRank(RankDto rankDto);

}
