package com.wetness.model.service;

import com.wetness.db.entity.Rank;
import com.wetness.db.repository.RankRepository;
import com.wetness.model.dto.request.RankDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class RankServiceImpl implements RankService{

    @Autowired
    RankRepository rankRepository;

    @Override
    public List<Rank> getRank(RankDto rankDto) {
        LocalDate date = LocalDate.now();
        Date cur = java.sql.Date.valueOf(date);
        String str = date.toString().replace("-", "");
//        System.out.println("조회할 날짜 date (LocalDate) : "+date);
//        System.out.println("조회할 날짜 cur (Date) : "+cur);
//        System.out.println("조회할 날짜 str (String) : "+str);

        List<Rank> list = new ArrayList<>();


        if(!rankDto.isDivideGugun() && !rankDto.isDivideWorkout()){
            //gugun 구분 X, workout 구분 X
            System.out.println("gugun 구분 x, workout 구분 x");
            list = rankRepository.findTop20ByDateOrderByCalorieDesc(cur);

        }else if(!rankDto.isDivideGugun() && rankDto.isDivideWorkout()){
            //gugun 구분 X, workout 구분 O
            System.out.println("gugun 구분 x, workout 구분 o");
        }else if(rankDto.isDivideGugun() && !rankDto.isDivideWorkout()){
            //gugun 구분 O, workout 구분 X
            System.out.println("gugun 구분 o, workout 구분 x");
            System.out.println(rankDto.getAddress());
        }else{
            //gugun 구분 O, workout 구분 O
            System.out.println("gugun 구분 o, workout 구분 o");
        }



        return list;
    }
}
