package com.wetness.model.service;

import com.wetness.db.entity.FitnessRecord;
import com.wetness.db.entity.Medal;
import com.wetness.db.entity.User;
import com.wetness.db.repository.FitnessRecordRepository;
import com.wetness.db.repository.MedalRepository;
import com.wetness.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("fitnessRecordService")
public class FitnessRecordServiceImpl implements FitnessRecordService{

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
        };

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
    public List<FitnessRecord> getWeeklyRecord(String nickname) {
        return null;
    }
}
