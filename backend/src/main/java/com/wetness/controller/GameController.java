package com.wetness.controller;

import com.wetness.model.dto.request.GameReqDto;
import com.wetness.model.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<Map<String,Long>> startGame(@RequestBody GameReqDto gameReq){
        Long gameId = gameService.startGame(gameReq); //exception 처리 필요

        Map<String,Long> result = new HashMap<>();
        result.put("gameId", gameId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
