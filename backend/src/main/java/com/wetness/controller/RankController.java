package com.wetness.controller;

import com.wetness.model.dto.response.RankResDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @PostMapping()
    @ApiOperation(value = "랭킹")
    public ResponseEntity<RankResDto> getRank(@RequestBody RankDto rankDto, @AuthenticationPrincipal UserDetailsImpl userDetails){

//        System.out.println(rankService.getRank(rankDto));
        List<Rank> ranks = rankService.getRank(rankDto, userDetails.getId());
        RankResDto rankResDto = new RankResDto(ranks);

        //success 또는 주소정보가 없습니다.
        return ResponseEntity.ok().body(rankResDto);
    }

}
