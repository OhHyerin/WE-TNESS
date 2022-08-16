package com.wetness.controller;

import com.wetness.model.dto.request.*;
import com.wetness.model.dto.response.DiaryRespDto;
import com.wetness.model.service.AwardService;
import com.wetness.model.service.GameService;
import com.wetness.model.service.UserDetailsImpl;
import com.wetness.model.service.UserService;
import com.wetness.util.AwsS3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game")
public class GameController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final GameService gameService;
    private final AwardService awardService;
    private final AwsS3Util awsS3Util;


    @PostMapping("/start")
    public ResponseEntity<Map<String, Long>> startGame(@RequestBody GameReqDto gameReqDto,
                                                       @AuthenticationPrincipal UserDetailsImpl user) {

        Long gameId = gameService.startGame(gameReqDto, user.id()); //exception 처리 필요

        Map<String, Long> result = new HashMap<>();
        result.put("gameId", gameId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/end")
    public ResponseEntity<Map<String, Long>> terminateGame(@RequestBody GameResultReqDto gameResult,
                                                           @AuthenticationPrincipal UserDetailsImpl user) {
//게임 종료
        gameService.terminateGame(gameResult, user.id());
//결과 저장        
        Long userGameId = gameService.insertResult(gameResult, user);
//award 체크
        awardService.awardCheckMedal(user.getId());
        awardService.awardCheckWorkout(user.getId(), gameResult.getWorkoutId(), gameResult.getScore());

        Map<String, Long> result = new HashMap<>();
        result.put("game_record_id", userGameId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/diary/{gameRecordId}")
    public ResponseEntity<String> writeDiary(@RequestParam("data") MultipartFile multipartFile, @PathVariable("gameRecordId") long userGameId,
                                             @AuthenticationPrincipal UserDetailsImpl user) throws IOException {

        String fileName = awsS3Util.upload(multipartFile, "diary");
        gameService.insertDiary(userGameId, fileName, user);
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    @PostMapping("/diary/delete")
    public ResponseEntity<String> deleteDiary(@RequestBody DeleteDiaryReqDto DeleteThis,
                                              @AuthenticationPrincipal UserDetailsImpl user) {
        gameService.invalidateDiary(DeleteThis.filename, user);
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    @GetMapping("/diary/{nickname}")
    public ResponseEntity<List<DiaryRespDto>> readDiary(@PathVariable("nickname") String nickname) {
        List<DiaryRespDto> results = gameService.readDiary(nickname);

        return new ResponseEntity<>(results, HttpStatus.OK);
    }

}
