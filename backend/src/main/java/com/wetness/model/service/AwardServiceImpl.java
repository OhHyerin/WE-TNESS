package com.wetness.model.service;

import com.wetness.db.entity.Award;
import com.wetness.db.entity.LoggedContinue;
import com.wetness.db.entity.User;
import com.wetness.db.entity.UserAward;
import com.wetness.db.repository.AwardRepository;
import com.wetness.db.repository.LoggedContinueRepository;
import com.wetness.db.repository.UserAwardRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.model.dto.response.AwardDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AwardServiceImpl implements AwardService {

    private final UserAwardRepository userAwardRepository;
    private final AwardRepository awardRepository;
    private final LoggedContinueRepository loggedContinueRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    private static final String CONTINUE_LOGIN_1 = "continue_login_1";
    private static final String CONTINUE_LOGIN_3 = "continue_login_3";
    private static final String CONTINUE_LOGIN_5 = "continue_login_5";
    private static final String CONTINUE_LOGIN_7 = "continue_login_7";

    @Override
    @Transactional
    public void loginAwardCheck(Long userId) {
        LoggedContinue loggedContinue = loggedContinueRepository.findByUserId(userId);
        if (loggedContinue.getConsecutively() == loggedContinue.getMaxConsecutively()) {
            int consecutively = loggedContinue.getConsecutively();
            User user = userRepository.findById(userId).orElse(null);

            if (consecutively >= 1) {
                Award award = awardRepository.findByEventName(CONTINUE_LOGIN_1);
                if (userAwardRepository.findByUserIdAndAwardId(userId, award.getId()) == null) {
                    UserAward userAward = new UserAward(award, user, LocalDateTime.now());
                    userAwardRepository.save(userAward);

                    notificationService.registerAwardMessage(userId, award.getId());
                }
            }

            if (consecutively >= 3) {
                Award award = awardRepository.findByEventName(CONTINUE_LOGIN_3);
                if (userAwardRepository.findByUserIdAndAwardId(userId, award.getId()) == null) {
                    UserAward userAward = new UserAward(award, user, LocalDateTime.now());
                    userAwardRepository.save(userAward);

                    notificationService.registerAwardMessage(userId, award.getId());
                }
            }

            if (consecutively >= 5) {
                Award award = awardRepository.findByEventName(CONTINUE_LOGIN_5);
                if (userAwardRepository.findByUserIdAndAwardId(userId, award.getId()) == null) {
                    UserAward userAward = new UserAward(award, user, LocalDateTime.now());
                    userAwardRepository.save(userAward);

                    notificationService.registerAwardMessage(userId, award.getId());
                }
            }

            if (consecutively >= 7) {
                Award award = awardRepository.findByEventName(CONTINUE_LOGIN_7);
                if (userAwardRepository.findByUserIdAndAwardId(userId, award.getId()) == null) {
                    UserAward userAward = new UserAward(award, user, LocalDateTime.now());
                    userAwardRepository.save(userAward);

                    notificationService.registerAwardMessage(userId, award.getId());
                }
            }
        }

    }

    @Override
    public void followAwardCheck(Long userId) {

    }

    @Override
    public ArrayList<AwardDto> getAwards(Long userId) {
        return userAwardRepository.findUserAwards(userId);
    }
}
