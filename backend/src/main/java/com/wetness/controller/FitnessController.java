package com.wetness.controller;

import com.wetness.db.entity.FitnessRecord;
import com.wetness.db.entity.Medal;
import com.wetness.model.dto.response.AwardDto;
import com.wetness.model.dto.response.HeatMapRespDto;
import com.wetness.model.dto.response.WeeklyRecordRespDto;
import com.wetness.model.service.FitnessRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/fitness")
@RequiredArgsConstructor
@CrossOrigin("*")
public class FitnessController {

    private final FitnessRecordService fitnessRecordService;

    @GetMapping("/{nickname}")
    public ResponseEntity<Map<String, Object>> getFitnessInfo(@PathVariable String nickname) {


        Map<String, Object> results = new HashMap<>();
        Medal medal = fitnessRecordService.getMedalRecord(nickname);
        List<HeatMapRespDto> records = fitnessRecordService.getHeatMap(nickname);
        List<WeeklyRecordRespDto> weeklyRecords = fitnessRecordService.getWeeklyRecord(nickname);
        int todayCal = fitnessRecordService.getTodayCalorie(nickname);
        List<AwardDto> award = fitnessRecordService.getAward(nickname);

        results.put("award", award);
        results.put("medal", medal);
        results.put("heatMapList", records);
        results.put("weeklyRecords", weeklyRecords);
        results.put("todayCalorie", todayCal);

        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}
