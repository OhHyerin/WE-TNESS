package com.wetness.model.dto.response;

import com.wetness.db.entity.Rank;
import com.wetness.model.service.RankService;
import com.wetness.model.service.UserService;
import com.wetness.model.service.UserServiceImpl;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RankResultResDto {

    private String userNickname;
//    private int workoutId; //여기
    private String address;
    private double calorie;
    private LocalDate date;  //임시로 타입 변환

    public RankResultResDto(Rank rank, String address){
        this.userNickname = rank.getUser().getNickname();
        this.address = address;
        this.calorie = rank.getCalorie();
        this.date = rank.getDate();
    }

    public RankResultResDto(Rank rank){
        this.userNickname = rank.getUser().getNickname();
        this.calorie = rank.getCalorie();
        this.date = rank.getDate();
    }
}
