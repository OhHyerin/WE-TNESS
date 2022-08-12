package com.wetness.model.service;

import com.wetness.db.entity.User;
import com.wetness.model.dto.request.DiaryReqDto;
import com.wetness.model.dto.request.GameReqDto;
import com.wetness.model.dto.request.GameResultReqDto;
import com.wetness.model.dto.request.TerminateGameDto;
import com.wetness.model.dto.response.DiaryRespDto;

import java.util.List;

public interface GameService {
    Long startGame(String title, Long userId);
    void terminateGame(GameResultReqDto result, Long userId);

    Long insertResult(GameResultReqDto result, UserDetailsImpl user);
    void insertDiary(Long gameRecordId,String fileName,UserDetailsImpl user);

    void invalidateDiary(String filename, UserDetailsImpl user);
    List<DiaryRespDto> readDiary(String nickname);
}
