package com.wetness.model.service;


import com.google.common.collect.Lists;
import com.wetness.db.entity.Rank;
import com.wetness.db.entity.User;
import com.wetness.db.repository.RankRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.model.dto.request.RankDto;
import com.wetness.model.dto.response.RankResDto;
import com.wetness.model.dto.response.RankResultResDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import springfox.documentation.schema.Entry;

import java.time.LocalDate;
import java.util.*;

@Service
public class RankServiceImpl implements RankService {

    @Autowired
    RankRepository rankRepository;

    @Autowired
    UserRepository userRepository;

    public static UserService userService;

    static LocalDate date = LocalDate.now();  //조회할 날짜

    @Override
    public RankResDto getRank(RankDto rankDto, long userId) {

        //운동 workoutId로 변경
        int[] workoutIds = rankDto.getWorkoutId();
        int workout = 0;
        if (workoutIds != null) {

            for (int i = 0; i < workoutIds.length; i++) {
                workout += Math.pow(2, workoutIds[i] - 1);
            }
        }
        List<Rank> ranks = new ArrayList<>();

        ranks = rankRepository.findByDate(date);
        if (workout == 0) {
            // workoutId가 선택 안됐을 때

            //list calorie 기준으로 내림차순 정렬
            Collections.sort(ranks, new Comparator<Rank>() {
                @Override
                public int compare(Rank o1, Rank o2) {
                    return descOrder(o1, o2);
                }
            });

            //0~20까지 리스트 자르기
            int min = Math.min(ranks.size(), 20);

//            List<Rank> newList = Lists.newArrayList(ranks.subList(0, min));
//            System.out.println("정렬하고 20개 짤라온 list : "+newList);

            List<RankResultResDto> newList = new ArrayList<>();
            for(int i=0;i<min;i++){
//                String address = userService.getAddress(ranks.get(i).getUser().getSidoCode(), ranks.get(i).getUser().getGugunCode());
                newList.add(new RankResultResDto(ranks.get(i)));
            }

            return new RankResDto("TOTAL_RANK_SUCCESS", newList);

        } else {
            //workoutId가 선택 됐을 때

            List<Rank> newList = new ArrayList<>();
//            for (int i = 0; i < ranks.size(); i++) {
//                if ((ranks.get(i).getWorkoutId() | workout) <= workout) {
////                    System.out.println("getWorkoutId랑 workout 비트마스크 일치");
//                    Rank get = ranks.get(i);
//                    newList.add(get);
//                }
//            }
            HashMap<Long, Rank> hashMap = new HashMap<>();
            for(int i=0;i<ranks.size();i++){
                if((ranks.get(i).getWorkoutId() | workout) <= workout){
                    long curUserId = ranks.get(i).getUser().getId();
                    Rank cur = ranks.get(i);
                    if(hashMap.containsKey(curUserId)){  //이미 이 유저가 랭크에 존재하면
                        cur.setCalorie(Math.max(hashMap.get(curUserId).getCalorie(), ranks.get(i).getCalorie()));
                        hashMap.put(curUserId, cur);  //hashMap에 해당 유저의 칼로리 갱신 (최댓값으로)
                    }
                    else{
                        hashMap.put(curUserId, cur);
                    }
                }
            }

            for(Rank r : hashMap.values()){
                newList.add(r);
            }


            Collections.sort(newList, new Comparator<Rank>() {
                @Override
                public int compare(Rank o1, Rank o2) {
                    return descOrder(o1, o2);
                }
            });
            int min = Math.min(newList.size(), 20);

            List<RankResultResDto> resultList = new ArrayList<>();
            for(int i=0;i<min;i++){
                resultList.add(new RankResultResDto(newList.get(i)));
            }


            return new RankResDto("WORKOUT_RANK_SUCCESS", resultList);

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
        for (int i = 0; i < workoutIds.length; i++) {
            workout += Math.pow(2, workoutIds[i] - 1);
        }


        System.out.println(workout);

        if (gugunCode != null) {
            //로그인 한 유저가 주소 정보가 있으면
            List<Rank> ranks = new ArrayList<>();

            ranks = rankRepository.findByGugunCodeAndDate(gugunCode, date);
            if (workout == 0) {
                // workoutId가 선택 안됐을 때

                //list calorie 기준으로 내림차순 정렬
                Collections.sort(ranks, new Comparator<Rank>() {
                    @Override
                    public int compare(Rank o1, Rank o2) {
                        return descOrder(o1, o2);
                    }
                });

                //0~20까지 리스트 자르기
                int min = Math.min(ranks.size(), 20);

                List<RankResultResDto> newList = new ArrayList<>();
                for(int i=0;i<min;i++){
                    String address = userService.getAddress(ranks.get(i).getUser().getSidoCode(), ranks.get(i).getUser().getGugunCode());
                    newList.add(new RankResultResDto(ranks.get(i), address));
                }

                return new RankResDto("GUGUN_TOTAL_RANK_SUCCESS", newList);

            } else {
                //workoutId가 선택 됐을 때

                List<Rank> newList = new ArrayList<>();
//                for (int i = 0; i < ranks.size(); i++) {
//                    if ((ranks.get(i).getWorkoutId() | workout) <= workout) {
//                        System.out.println("getWorkoutId랑 workout 비트마스크 일치");
//                        Rank get = ranks.get(i);
//                        newList.add(get);
//                    }
//                }

                HashMap<Long, Rank> hashMap = new HashMap<>();
                for(int i=0;i<ranks.size();i++){
                    if((ranks.get(i).getWorkoutId() | workout) <= workout){
                        long curUserId = ranks.get(i).getUser().getId();
                        Rank cur = ranks.get(i);
                        if(hashMap.containsKey(curUserId)){  //이미 이 유저가 랭크에 존재하면
                            cur.setCalorie(Math.max(hashMap.get(curUserId).getCalorie(), ranks.get(i).getCalorie()));
                            hashMap.put(curUserId, cur);  //hashMap에 해당 유저의 칼로리 갱신 (최댓값으로)
                        }
                        else{
                            hashMap.put(curUserId, cur);
                        }
                    }
                }

                for(Rank r : hashMap.values()){
                    newList.add(r);
                }

                Collections.sort(newList, new Comparator<Rank>() {
                    @Override
                    public int compare(Rank o1, Rank o2) {
                        return descOrder(o1, o2);
                    }
                });
                int min = Math.min(newList.size(), 20);

                List<RankResultResDto> resultList = new ArrayList<>();
                for(int i=0;i<min;i++){
                    String address = userService.getAddress(newList.get(i).getUser().getSidoCode(), newList.get(i).getUser().getGugunCode());
                    resultList.add(new RankResultResDto(newList.get(i), address));
                }

                return new RankResDto("GUGUN_WORKOUT_RANK_SUCCESS", resultList);

            }
        } else {
            //로그인 한 유저가 주소 정보가 없으면
            List<RankResultResDto> ranks = new ArrayList<>();
            RankResDto rankResDto = new RankResDto("NO_GUGUN_INFO", ranks);
            return rankResDto;

        }
    }

    private static int descOrder(Rank o1, Rank o2) {
        if (o1.getCalorie() > o2.getCalorie()) {
            return -1;
        } else if (o1.getCalorie() < o2.getCalorie()) {
            return 1;
        } else {
            return 0;
        }
    }
}
