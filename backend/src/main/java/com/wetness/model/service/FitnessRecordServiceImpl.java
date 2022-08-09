package com.wetness.model.service;

import com.wetness.db.entity.FitnessRecord;
import com.wetness.db.entity.Medal;
import com.wetness.db.entity.User;
import com.wetness.db.repository.FitnessRecordRepository;
import com.wetness.db.repository.MedalRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.model.dto.response.WeeklyRecordRespDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service("fitnessRecordService")
public class FitnessRecordServiceImpl implements FitnessRecordService{

    static final String[] days = {"","mon","tue","wed","thu","fri","sat","sun"};
    @Autowired
    MedalRepository medalRepo;
    @Autowired
    UserRepository userRepo;

    @Autowired
    FitnessRecordRepository fitRepo;



    @Override
    public Medal getMedalRecord(String nickname) {
        //없는 닉네임에 대해서 Exception 처리 필요
        User user = userRepo.findByNickname(nickname);
        if(!medalRepo.findById(user.getId()).isPresent()){ //아직 기록 없음
            medalRepo.save(new Medal(user.getId(), 0, 0, 0, 0));
        }

        Medal medal = medalRepo.findById(user.getId()).get();

        return medal;
    }

    @Override
    public List<FitnessRecord> getFitnessRecord(String nickname) {
        User user = userRepo.findByNickname(nickname);

        List<FitnessRecord> records = fitRepo.findByUser(user);

        return records;
    }

    @Override
    public List<WeeklyRecordRespDto> getWeeklyRecord(String nickname) {
        User user = userRepo.findByNickname(nickname);

        LocalDate today = LocalDate.now();
        int dayOfWeek = today.getDayOfWeek().getValue(); //월요일 : 1 ~ 일요일 : 7
        LocalDate weekAgo = LocalDate.now().minusDays(dayOfWeek);
        List<FitnessRecord> records = fitRepo.findByUserAndRegDateGreaterThan(user,weekAgo);

//Entity to RespDto
        double[] calorie = new double[8];
        for(int i=0; i<8; i++) calorie[i]=0;

        for(int i=0; i<records.size(); i++){
            FitnessRecord record = records.get(i);
            int n = record.getRegDate().getDayOfWeek().getValue();
            calorie[n] = record.getCalorie();
        }

        List<WeeklyRecordRespDto> weeklyRecords = new ArrayList<>();
        for(int i=1; i<8; i++){
            if(calorie[i]==0){
                weeklyRecords.add(new WeeklyRecordRespDto(days[i],0));
            }else{
                weeklyRecords.add(new WeeklyRecordRespDto(days[i],calorie[i]));
            }
        }

        return weeklyRecords;
    }
}
