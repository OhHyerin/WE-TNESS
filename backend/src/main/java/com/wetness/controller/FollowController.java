package com.wetness.controller;

import com.wetness.model.dto.request.FollowReqDto;
import com.wetness.model.dto.response.BaseResponseEntity;
import com.wetness.model.dto.response.FollowUserResDto;
import com.wetness.model.service.FollowService;
import com.wetness.model.service.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
@Slf4j
public class FollowController {

    private final FollowService followService;

    @PostMapping
    public ResponseEntity<?> registerFollow(@RequestBody FollowReqDto followReqDto, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (followService.registerFollow(userDetails.getNickname(), followReqDto.getNickname())) {
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @DeleteMapping
    public ResponseEntity<?> removeFollow(@RequestBody FollowReqDto followReqDto, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (followService.removeFollow(userDetails.getNickname(), followReqDto.getNickname())) {
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @GetMapping
    public ResponseEntity<?> getFollower(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        FollowUserResDto followUserResDto = followService.getFollowers(userDetails.getId());
        return ResponseEntity.ok().body(followUserResDto);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getFollowing(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        FollowUserResDto followUserResDto = followService.getFollowings(userDetails.getId());
        return ResponseEntity.ok().body(followUserResDto);
    }
}
