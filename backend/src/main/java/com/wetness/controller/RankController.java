package com.wetness.controller;

import com.wetness.db.entity.Rank;
import com.wetness.model.dto.request.RankDto;
import com.wetness.model.dto.response.BaseResponseEntity;
import com.wetness.model.dto.response.RankResDto;
import com.wetness.model.service.RankService;
import com.wetness.model.service.UserDetailsImpl;
import com.wetness.model.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rank")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RankController {
    public static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final RankService rankService;

    @PostMapping()
    @ApiOperation(value = "랭킹")
    public ResponseEntity<RankResDto> getRank(@RequestBody RankDto rankDto, @AuthenticationPrincipal UserDetailsImpl userDetails){

//        System.out.println(rankService.getRank(rankDto));
//        List<Rank> ranks = rankService.getRank(rankDto, userDetails.getId());
//        RankResDto rankResDto = new RankResDto("message", ranks);

        RankResDto rankResDto;
        if(rankDto.isSelectGugun()){
            rankResDto = rankService.getGugunRank(rankDto, userDetails.getId());
        }else{
            rankResDto = rankService.getRank(rankDto, userDetails.getId());
        }

        //success 또는 주소정보가 없습니다.
        return ResponseEntity.ok().body(rankResDto);
    }

}
