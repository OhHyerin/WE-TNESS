package com.wetness.controller;

import com.wetness.model.dto.request.GameReqDto;
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

    @PostMapping
    public ResponseEntity<Map<String,Long>> startGame(@RequestBody GameReqDto gameReq,
                                                      @AuthenticationPrincipal UserDetailsImpl user){

        Long gameId = gameService.startGame(gameReq,user.id()); //exception 처리 필요

        Map<String,Long> result = new HashMap<>();
        result.put("gameId", gameId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/result")
    public ResponseEntity<Map<String,Long>> saveResult(){
        return null;
    }

}
