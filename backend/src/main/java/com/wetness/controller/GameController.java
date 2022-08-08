package com.wetness.controller;

import com.wetness.model.dto.request.DiaryReqDto;
import com.wetness.model.dto.request.GameReqDto;
import com.wetness.model.dto.request.GameResultReqDto;
import com.wetness.model.dto.request.TerminateGameDto;
import com.wetness.model.service.GameService;
import com.wetness.model.service.UserDetailsImpl;
import com.wetness.model.service.UserService;
import com.wetness.util.AwsS3Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @Autowired
    private AwsS3Util awsS3Util;

    @PostMapping("/start")
    public ResponseEntity<Map<String,Long>> startGame(@RequestBody GameReqDto gameReqDto,
                                                      @AuthenticationPrincipal UserDetailsImpl user){

        Long gameId = gameService.startGame(gameReqDto,user.id()); //exception 처리 필요

        Map<String,Long> result = new HashMap<>();
        result.put("gameId", gameId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/end")
    public ResponseEntity<Map<String,Long>> terminateGame(@RequestBody GameResultReqDto gameResult,
                                                       @AuthenticationPrincipal UserDetailsImpl user){
//게임 종료
        gameService.terminateGame(gameResult,user.id());
//결과 저장        
        Long userGameId = gameService.insertResult(gameResult,user);

        Map<String,Long> result = new HashMap<>();
        result.put("userGameId",userGameId);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @PostMapping("/diary/{gameRecordId}")
    public ResponseEntity<String> writeDiary( @RequestParam("data") MultipartFile multipartFile,@PathVariable long userGameId,
                                             @AuthenticationPrincipal UserDetailsImpl user) throws IOException {

        String fileName = awsS3Util.upload(multipartFile,"diary");
        gameService.insertDiary(userGameId, fileName, user);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

}
