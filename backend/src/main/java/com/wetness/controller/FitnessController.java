package com.wetness.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/fitness")
public class FitnessController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

//    @GetMapping("/{nickname}")
//    public ResponseEntity<HashMap<String,Object>> getFitnessRecord(@PathVariable("nickname") String nickname){
//
//
//    }

}
