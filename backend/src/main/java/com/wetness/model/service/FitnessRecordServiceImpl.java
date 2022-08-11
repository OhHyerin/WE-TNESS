package com.wetness.model.service;

import com.wetness.db.entity.FitnessRecord;
import com.wetness.db.entity.Medal;
import com.wetness.db.entity.User;
import com.wetness.db.repository.*;
import com.wetness.model.dto.response.AwardDto;
import com.wetness.model.dto.response.HeatMapRespDto;
import com.wetness.model.dto.response.LocalDateResDto;
import com.wetness.model.dto.response.WeeklyRecordRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service("fitnessRecordService")
@RequiredArgsConstructor
public class FitnessRecordServiceImpl implements FitnessRecordService {

    private static final String[] DAYS = {"", "mon", "tue", "wed", "thu", "fri", "sat", "sun"};

    private final MedalRepository medalRepo;
    private final UserRepository userRepo;
    private final FitnessRecordRepository fitRepo;
    private final LoggedInRepository loggedInRepo;
    private final UserAwardRepository userAwardRepository;

    @Override
    public Medal getMedalRecord(String nickname) {
        //없는 닉네임에 대해서 Exception 처리 필요
        User user = userRepo.findByNickname(nickname);
        if (!medalRepo.findById(user.getId()).isPresent()) { //아직 기록 없음
            medalRepo.save(new Medal(user.getId(), 0, 0, 0, 0));
        }

        Medal medal = medalRepo.findById(user.getId()).get();

        return medal;
    }

    @Override
    public List<HeatMapRespDto> getHeatMap(String nickname) {
        User user = userRepo.findByNickname(nickname);

        List<FitnessRecord> records = fitRepo.findByUser(user);

        List<HeatMapRespDto> heatMap = new ArrayList<>();
        for (int i = 0; i < records.size(); i++) {
            FitnessRecord record = records.get(i);
            int n = (int) Math.round(record.getCalorie());
            heatMap.add(new HeatMapRespDto(n, record.getRegDate()));
        }

        return heatMap;
    }

    @Override
    public List<WeeklyRecordRespDto> getWeeklyRecord(String nickname) {
        User user = userRepo.findByNickname(nickname);

        LocalDate today = LocalDate.now();
        int dayOfWeek = today.getDayOfWeek().getValue(); //월요일 : 1 ~ 일요일 : 7
        LocalDate weekAgo = LocalDate.now().minusDays(dayOfWeek);
        List<FitnessRecord> records = fitRepo.findByUserAndRegDateGreaterThan(user, weekAgo);
        List<LocalDateResDto> weekLoginDateLog = loggedInRepo.getWeekLoginDateLog(user.getId(), weekAgo.atStartOfDay());

        //Entity to RespDto
        double[] calorie = new double[8];
        boolean[] isLogin = new boolean[8];

        for (FitnessRecord record : records) {
            int n = record.getRegDate().getDayOfWeek().getValue();
            calorie[n] = record.getCalorie();
        }

        for (LocalDateResDto record : weekLoginDateLog) {
            int n = record.getDate().getDayOfWeek().getValue();
            isLogin[n] = true;
        }

        List<WeeklyRecordRespDto> weeklyRecords = new ArrayList<>();
        for (int i = 1; i < 8; i++) {
            weeklyRecords.add(new WeeklyRecordRespDto(DAYS[i], calorie[i], isLogin[i]));
        }

        return weeklyRecords;
    }

    @Override
    public int getTodayCalorie(String nickname) {
        User user = userRepo.findByNickname(nickname);

        if (fitRepo.findByUserAndRegDate(user, LocalDate.now()).isPresent()) {
            return (int) Math.round(fitRepo.findByUserAndRegDate(user, LocalDate.now()).get().getCalorie());
        } else return 0;

    }

    @Override
    public ArrayList<AwardDto> getAward(String nickname) {
        User user = userRepo.findByNickname(nickname);
        if (user != null) {
            return userAwardRepository.findUserAwards(user.getId());
        }
        return null;
    }
}
