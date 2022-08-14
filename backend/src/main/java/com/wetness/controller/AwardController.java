package com.wetness.controller;

import com.wetness.model.dto.response.AwardDto;
import com.wetness.model.service.AwardService;
import com.wetness.model.service.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/award")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AwardController {
    private final AwardService awardService;

    @GetMapping
    public ResponseEntity<?> findAwards(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        ArrayList<AwardDto> awards = awardService.getAwards(userDetails.getId());
        return ResponseEntity.ok().body(awards);
    }
}
