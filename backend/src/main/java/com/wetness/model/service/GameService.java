package com.wetness.model.service;

import com.wetness.model.dto.request.DiaryReqDto;
import com.wetness.model.dto.request.GameReqDto;
import com.wetness.model.dto.request.GameResultReqDto;
import com.wetness.model.dto.request.TerminateGameReqDto;

public interface GameService {
    Long startGame(GameReqDto gameReqDto, Long userId);
    void terminateGame(TerminateGameReqDto terminateDto, Long userId);

    Long insertResult(GameResultReqDto result, UserDetailsImpl user);
    void insertDiary(DiaryReqDto diaryReq, UserDetailsImpl user);
}
