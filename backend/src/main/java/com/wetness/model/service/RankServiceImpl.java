package com.wetness.model.service;


import com.wetness.db.entity.Rank;
import com.wetness.db.entity.User;
import com.wetness.db.repository.RankRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.model.dto.request.RankDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RankServiceImpl implements RankService{

    @Autowired
    RankRepository rankRepository;

    @Autowired
    UserRepository userRepository;
    @Override
    public List<Rank> getRank(RankDto rankDto, long userId) {
        //조회할 날짜
        LocalDate date = LocalDate.now();

        //조회할 지역
        Optional<User> user = userRepository.findById(userId);

        //반환할 list
        List<Rank> list = new ArrayList<>();

        if(user.get().getGugunCode()==null){
            //로그인 한 유저가 주소 정보가 없으면
            List<Rank> totalRanks = new ArrayList<>();
            Optional<Rank> workoutRanks;

            if(rankDto.getWorkoutId()!=0){
                // workoutId가 선택 안됐을 때
                totalRanks = rankRepository.findByUserIdAndDateGreaterThanEqual(userId, date);
            }else{
                //workoutId가 선택 됐을 때
                workoutRanks = rankRepository.findByUserIdAndWorkoutIdAndDateGreaterThanEqual(userId, rankDto.getWorkoutId(), date);
            }
        }else{
            //로그인 한 유저가 주소 정보가 있으면

        }




//
//        if(!rankDto.isDivideGugun() && !rankDto.isDivideWorkout()){
//            //gugun 구분 X, workout 구분 X
//            System.out.println("gugun 구분 x, workout 구분 x");
//            list = rankRepository.findTop20ByDateOrderByCalorieDesc(cur);
//
//        }else if(!rankDto.isDivideGugun() && rankDto.isDivideWorkout()){
//            //gugun 구분 X, workout 구분 O
//            System.out.println("gugun 구분 x, workout 구분 o");
//            list = rankRepository.findTop20ByDateAndWorkoutIdOrderByCalorieDesc(cur, rankDto.getWorkoutId());
//        }else if(rankDto.isDivideGugun() && !rankDto.isDivideWorkout()){
//            //gugun 구분 O, workout 구분 X
//            System.out.println("gugun 구분 o, workout 구분 x");
////            System.out.println(rankDto.getAddress());
//
//            if(user.get().getGugunCode()!=null){
//                list = rankRepository.findTop20ByDateAndGugunCodeOrderByCalorieDesc(cur, user.get().getGugunCode());
//            }
//        }else {
//            //gugun 구분 O, workout 구분 O
//            System.out.println("gugun 구분 o, workout 구분 o");
//
//            if(user.get().getGugunCode()!=null){
//                list = rankRepository.findTop20ByDateAndGugunCodeAndWorkoutIdOrderByCalorieDesc(cur, user.get().getGugunCode(), rankDto.getWorkoutId());
//            }
//
//        }


        return list;
    }
}
