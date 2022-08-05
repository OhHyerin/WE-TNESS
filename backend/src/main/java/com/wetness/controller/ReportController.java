package com.wetness.controller;

import com.wetness.model.dto.request.ReportReqDto;
import com.wetness.model.dto.response.*;
import com.wetness.model.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<?> reportUser(@RequestBody ReportReqDto reportReqDto, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (reportService.reportUser(userDetails.getNickname(), reportReqDto.getAccused(), reportReqDto.getContent())) {
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @GetMapping
    public ResponseEntity<?> getReports(@RequestParam(required = false) Boolean process) {
        ArrayList<ReportDto> reports = reportService.getReports(process);
        return ResponseEntity.ok().body(new ReportResListDto(reports));
    }

    @PatchMapping("/{report}")
    public ResponseEntity<?> process(@PathVariable Long report) {
        if(reportService.processReport(report)){
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }
}
