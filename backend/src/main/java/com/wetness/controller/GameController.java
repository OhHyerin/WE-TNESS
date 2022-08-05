package com.wetness.controller;

import com.wetness.model.dto.request.DiaryReqDto;
import com.wetness.model.dto.request.GameReqDto;
import com.wetness.model.dto.request.GameResultReqDto;
import com.wetness.model.dto.request.TerminateGameReqDto;
import com.wetness.model.service.GameService;
import com.wetness.model.service.UserDetailsImpl;
import com.wetness.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/game")
public class GameController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    GameService gameService;
    @Autowired
    UserService userService;

    @PostMapping("/start")
    public ResponseEntity<Map<String,Long>> startGame(@RequestBody GameReqDto gameReqDto,
                                                      @AuthenticationPrincipal UserDetailsImpl user){

        Long gameId = gameService.startGame(gameReqDto,user.id()); //exception 처리 필요

        Map<String,Long> result = new HashMap<>();
        result.put("gameId", gameId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/end")
    public ResponseEntity<String> terminateGame(@RequestBody TerminateGameReqDto terminateDto,
                                                          @AuthenticationPrincipal UserDetailsImpl user){

        gameService.terminateGame(terminateDto,user.id()); //exception 처리 필요

        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }


    @PostMapping("/result")
    public ResponseEntity<Map<String,Long>> saveResult(@RequestBody GameResultReqDto gameResult,
                                                       @AuthenticationPrincipal UserDetailsImpl user){

        Long userGameId = gameService.insertResult(gameResult,user);

        Map<String,Long> result = new HashMap<>();
        result.put("userGameId",userGameId);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @PostMapping("/diary")
    public ResponseEntity<String> writeDiary(@RequestBody DiaryReqDto diary, @AuthenticationPrincipal UserDetailsImpl user){
        gameService.insertDiary(diary,user);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

}
