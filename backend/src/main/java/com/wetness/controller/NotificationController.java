package com.wetness.controller;

import com.wetness.model.dto.request.NotificationReqDto;
import com.wetness.model.dto.response.BaseResponseEntity;
import com.wetness.model.dto.response.NotificationDto;
import com.wetness.model.dto.response.NotificationListResDto;
import com.wetness.model.service.NotificationService;
import com.wetness.model.service.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/invite")
    public ResponseEntity<?> registerInviteMessage(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                   @RequestBody NotificationReqDto notificationReqDto) {
        if (notificationService.registerInviteMessage(notificationReqDto, userDetails.getNickname())) {
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @PostMapping("/follow")
    public ResponseEntity<?> registerFollowMessage(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                   @RequestBody NotificationReqDto notificationReqDto) {
        if (notificationService.registerFollowMessage(notificationReqDto, userDetails.getNickname())) {
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @GetMapping
    public ResponseEntity<?> getNotification(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        ArrayList<NotificationDto> notification = notificationService.getNotification(userDetails.getId());
        return ResponseEntity.ok().body(new NotificationListResDto(notification));
    }

    @PostMapping("check")
    public ResponseEntity<?> checkNotification(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                               @RequestBody NotificationReqDto notificationReqDto) {
        if (notificationService.checkNotification(userDetails.id(), notificationReqDto.getNotificationId())) {
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

}

