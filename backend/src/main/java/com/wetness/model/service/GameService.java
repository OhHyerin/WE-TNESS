package com.wetness.model.service;

import com.wetness.model.dto.request.DiaryReqDto;
import com.wetness.model.dto.request.GameReqDto;
import com.wetness.model.dto.request.GameResultReqDto;

public interface GameService {
    Long startGame(GameReqDto gameReqDto, Long userId);
    Long insertResult(GameResultReqDto result, UserDetailsImpl user);
    void insertDiary(DiaryReqDto diaryReq, UserDetailsImpl user);
}
