package com.wetness.controller;

import com.wetness.db.entity.FitnessRecord;
import com.wetness.db.entity.Medal;
import com.wetness.model.dto.response.WeeklyRecordRespDto;
import com.wetness.model.service.FitnessRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/fitness")
public class FitnessController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    FitnessRecordService fitnessRecordService;

    @GetMapping("/{nickname}")
    public ResponseEntity<Map<String, Object>> getFitnessInfo(@PathVariable String nickname){


        Map<String, Object> results = new HashMap<>();
        Medal medal = fitnessRecordService.getMedalRecord(nickname);
        List<FitnessRecord> records = fitnessRecordService.getFitnessRecord(nickname);
        List<WeeklyRecordRespDto> weeklyRecords = fitnessRecordService.getWeeklyRecord(nickname);

        results.put("medal", medal);
        results.put("heatMapList", records);
        results.put("weeklyRecords",weeklyRecords);

        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}
