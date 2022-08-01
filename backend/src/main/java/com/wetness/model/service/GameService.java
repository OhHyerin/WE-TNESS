package com.wetness.model.service;

import com.wetness.model.dto.request.GameReqDto;

public interface GameService {
    Long startGame(GameReqDto gameReq);
}
