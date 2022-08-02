package com.wetness.model.service;

import com.wetness.db.entity.Rank;
import com.wetness.db.repository.RankRepository;
import com.wetness.model.dto.request.RankDto;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.List;

@Service
public class RankServiceImpl implements RankService{

    RankRepository rankRepository;

    @Override
    public List<Rank> getRank(RankDto rankDto) {
        Date date = new Date(Calendar.getInstance().getTimeInMillis());
        SimpleDateFormat sdf = new SimpleDateFormat( "yyyy-MM-dd");
        String cur = sdf.toString();
        System.out.println(cur);

        if(!rankDto.isDivideGugun() && !rankDto.isDivideWorkout()){
            //gugun 구분 X, workout 구분 X
            rankRepository.findTop20ByDateOrderByCalorieDesc(cur);

        }else if(!rankDto.isDivideGugun() && rankDto.isDivideWorkout()){
            //gugun 구분 X, workout 구분 O
        }else if(rankDto.isDivideGugun() && !rankDto.isDivideWorkout()){
            //gugun 구분 O, workout 구분 X
        }else{
            //gugun 구분 O, workout 구분 O
        }



        return null;
    }
}
