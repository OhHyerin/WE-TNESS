package com.wetness.model.service;


import com.google.common.collect.Lists;
import com.wetness.db.entity.Rank;
import com.wetness.db.entity.User;
import com.wetness.db.repository.RankRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.model.dto.request.RankDto;
import com.wetness.model.dto.response.RankResDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class RankServiceImpl implements RankService{

    @Autowired
    RankRepository rankRepository;

    @Autowired
    UserRepository userRepository;
    @Override
    public RankResDto getRank(RankDto rankDto, long userId) {
        //조회할 날짜
        LocalDate date = LocalDate.now();

        //조회할 지역
//        Optional<User> user = userRepository.findById(userId);

        //반환할 list
        List<Rank> list = new ArrayList<>();

        //운동 workoutId로 변경
        int[] workoutIds = rankDto.getWorkoutId();
        int workout = 0;
        for(int i=0;i<workoutIds.length;i++){
            workout += Math.pow(2,workoutIds[i]-1);
        }


        System.out.println(workout);
            List<Rank> ranks = new ArrayList<>();

            ranks = rankRepository.findByDate(date);
            if(workout==0){
                // workoutId가 선택 안됐을 때

                //list calorie 기준으로 내림차순 정렬
                Collections.sort(ranks, new Comparator<Rank>() {
                    @Override
                    public int compare(Rank o1, Rank o2) {
                        return descOrder(o1, o2);
                    }
                });

                //0~20까지 리스트 자르기
                List<Rank> newList = Lists.newArrayList(ranks.subList(0, 20));

                return new RankResDto("TOTAL_RANK_SUCCESS", newList);

            }else{
                //workoutId가 선택 됐을 때

                List<Rank> newList = new ArrayList<>();
                for(int i=0;i<ranks.size();i++){
                    if(((1<<ranks.get(i).getWorkoutId()) & (1<<workout)) == (1<<workout)){
                        System.out.println("getWorkoutId랑 workout 비트마스크 일치");
                        Rank get = ranks.get(i);
                        newList.add(get);
                    }
                }

                Collections.sort(newList, new Comparator<Rank>() {
                    @Override
                    public int compare(Rank o1, Rank o2) {
                        return descOrder(o1, o2);
                    }
                });

                ranks = Lists.newArrayList(newList.subList(0, 20));

                return new RankResDto("WORKOUT_RANK_SUCCESS", ranks);

            }

    }

    @Override
    public RankResDto getGugunRank(RankDto rankDto, long userId) {
        //조회할 날짜
        LocalDate date = LocalDate.now();

        //조회할 지역
        Optional<User> user = userRepository.findById(userId);
        String gugunCode = user.get().getGugunCode();

        //운동 workoutId로 변경
        int[] workoutIds = rankDto.getWorkoutId();
        int workout = 0;
        for(int i=0;i<workoutIds.length;i++){
            workout += Math.pow(2,workoutIds[i]-1);
        }


        System.out.println(workout);

        if(gugunCode!=null){
            //로그인 한 유저가 주소 정보가 있으면
            List<Rank> ranks = new ArrayList<>();

            ranks = rankRepository.findByGugunCodeAndDate(gugunCode, date);
            if(workout==0){
                // workoutId가 선택 안됐을 때

                //list calorie 기준으로 내림차순 정렬
                Collections.sort(ranks, new Comparator<Rank>() {
                    @Override
                    public int compare(Rank o1, Rank o2) {
                        return descOrder(o1, o2);
                    }
                });

                //0~20까지 리스트 자르기
                List<Rank> newList = Lists.newArrayList(ranks.subList(0, 20));

                return new RankResDto("GUGUN_TOTAL_RANK_SUCCESS", newList);

            }else{
                //workoutId가 선택 됐을 때

                List<Rank> newList = new ArrayList<>();
                for(int i=0;i<ranks.size();i++){
                    if(((1<<ranks.get(i).getWorkoutId()) & (1<<workout)) == (1<<workout)){
                        System.out.println("getWorkoutId랑 workout 비트마스크 일치");
                        Rank get = ranks.get(i);
                        newList.add(get);
                    }
                }

                Collections.sort(newList, new Comparator<Rank>() {
                    @Override
                    public int compare(Rank o1, Rank o2) {
                        return descOrder(o1, o2);
                    }
                });

                ranks = Lists.newArrayList(newList.subList(0, 20));

                return new RankResDto("GUGUN_WORKOUT_RANK_SUCCESS", ranks);

            }
        }else{
            //로그인 한 유저가 주소 정보가 없으면
            RankResDto rankResDto = new RankResDto("NO_GUGUN_INFO", null);
            return rankResDto;

        }
    }

    private static int descOrder(Rank o1, Rank o2){
        if(o1.getCalorie()>o2.getCalorie()){
            return -1;
        }
        else if(o1.getCalorie()<o2.getCalorie()){
            return 1;
        }
        else{
            return 0;
        }
    }
}
