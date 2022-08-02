package com.wetness.controller;

import com.wetness.db.entity.Rank;
import com.wetness.model.dto.request.RankDto;
import com.wetness.model.dto.response.BaseResponseEntity;
import com.wetness.model.service.RankService;
import com.wetness.model.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rank")
@RequiredArgsConstructor
public class RankController {
    public static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final RankService rankService;
    private final UserService userService;

    @PostMapping()
    @ApiOperation(value = "랭킹")
    public ResponseEntity<List<Rank>> getRank(@RequestBody RankDto rankDto){

//        System.out.println(rankService.getRank(rankDto));
        List<Rank> ranks = rankService.getRank(rankDto);
//        for(int i=0;i<ranks.size();i++){
//            System.out.println("칼로리? : "+ranks.get(i).getCalorie()+" 누가? : "+ranks.get(i).getUserId());
//        }



        return ResponseEntity.ok().body(ranks);
    }

}
