package com.wetness.controller;

import com.wetness.db.entity.Follow;
import com.wetness.db.entity.User;
import com.wetness.model.dto.request.FollowReqDto;
import com.wetness.model.dto.response.BaseResponseEntity;
import com.wetness.model.dto.response.UserInfoResDto;
import com.wetness.model.service.FollowService;
import com.wetness.model.service.UserDetailsImpl;
import com.wetness.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
@Slf4j
public class FollowController {

    private final FollowService followService;
    private final UserService userService;

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
    public ResponseEntity<?> getFollow(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }
}
