package com.wetness.controller;

import com.wetness.model.dto.request.DisconnectionReq;
import com.wetness.model.dto.request.EnterRoomReq;
import com.wetness.model.dto.request.MakeRoomReq;
import com.wetness.model.dto.response.EnterRoomRes;
import com.wetness.model.dto.response.RoomListRes;
import com.wetness.model.service.RoomService;
import com.wetness.model.service.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/room")
public class RoomController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final RoomService roomService;

    @PostMapping(value = "/make")
    public ResponseEntity<?> makeRoom(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody MakeRoomReq makeRoomReq) {

        try {
            roomService.generateRoom(userDetails, makeRoomReq);
            logger.info("세션생성 성공");

            logger.info("/room/make 토큰 생성 성공, token successfully generated");
            return ResponseEntity.ok().body(roomService.makeToken(userDetails, new EnterRoomReq(makeRoomReq.getTitle(), makeRoomReq.getPassword())));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping(value = "/enter")
    public ResponseEntity<?> enterRoom(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody EnterRoomReq enterRoomReq) {

        try {
            EnterRoomRes enterRoomRes = roomService.makeToken(userDetails, enterRoomReq);
            if (enterRoomRes.getToken().equals("Unauthorized")) {
                return ResponseEntity.badRequest().body("비밀번호가 틀립니다");
            }
            logger.info("/room/enter 토큰 생성 성공, token successfully generated");
            return ResponseEntity.ok().body(enterRoomRes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/disconnect")
    public ResponseEntity<?> disconnection(@RequestBody DisconnectionReq disconnectionReq) {
        try {
            roomService.disconnect(disconnectionReq);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(value = "")
    public ResponseEntity<?> list() {
        return ResponseEntity.ok().body(roomService.getlist());
    }

    @GetMapping(value = "/search")
    public ResponseEntity<?> search(@RequestParam String keyword) {
        return ResponseEntity.ok().body(roomService.getSearch(keyword));
    }
}
