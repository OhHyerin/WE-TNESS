package com.wetness.model.dto.response;

import com.wetness.db.entity.Medal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Component
public class FitnessInfoRespDto {

    public Medal medal;

//    {
//        // 달성 도전과제
//        achieveAwards: [1, 2, 3, 5, 10]
//
//        // 잔디를 위한 데이터
//        heatMapList: [
//        {date: '2022-08-02', count: 15},
//	]
//
//
//        // 전적 정보
//        matches: {
//            total: 100
//            first: 1
//            second: 2
//            third: 3
//        }
//
//        // 칼로리 소모량 (오늘 소모량 / 운동량)
//        todayCalories: '',
//                weeklyCalories: [
//        {
//            date: 'mon',
//                    value: ''
//        },
//        {
//            date: 'tue',
//                    value: ''
//        },
//        {
//            date: 'wed',
//                    value: ''
//        },
//        {
//            date: 'thu',
//                    value: ''
//        },
//        {
//            date: 'fri',
//                    value: ''
//        },
//        {
//            date: 'sat',
//                    value: ''
//        },
//        {
//            date: 'sun',
//                    value: ''
//        },
//  ],
//
//        // 사진 6장
//        diaryPhotos: []
//    }
}
