package com.wetness.model.service;

import com.wetness.db.entity.*;
import com.wetness.db.repository.*;
import com.wetness.model.dto.response.AwardDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AwardServiceImpl implements AwardService {

    private final NotificationService notificationService;

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final UserAwardRepository userAwardRepository;
    private final AwardRepository awardRepository;
    private final LoggedContinueRepository loggedContinueRepository;
    private final MedalRepository medalRepository;

    private static final String LOGIN_1 = "login_1";
    private static final String LOGIN_3 = "login_3";
    private static final String LOGIN_5 = "login_5";
    private static final String GOLD_1 = "gold_1";
    private static final String GOLD_10 = "gold_10";
    private static final String SILVER_1 = "silver_1";
    private static final String SILVER_22 = "silver_22";
    private static final String BRONZE_1 = "bronze_1";
    private static final String BRONZE_33 = "bronze_33";
    private static final String PUSHUP_20 = "pushup_20";
    private static final String PUSHUP_40 = "pushup_40";
    private static final String BURPEE_20 = "burpee_20";
    private static final String BURPEE_40 = "burpee_40";
    private static final String SQUAT_20 = "squat_20";
    private static final String SQUAT_40 = "squat_40";
    private static final String PLANK_1 = "plank_1";
    private static final String PLANK_2 = "plank_2";
    private static final String FOLLOWER_1 = "follower_1";
    private static final String FOLLOWER_10 = "follower_10";
    private static final String FOLLOWER_100 = "follower_100";

    private static final int SQUAT = 1;
    private static final int PUSH_UP = 2;
    private static final int BURPEE = 3;
    private static final int PLANK = 4;

    @Override
    @Transactional
    public void awardCheckLogin(Long userId) {
        LoggedContinue loggedContinue = loggedContinueRepository.findByUserId(userId);
        if (loggedContinue.getConsecutively() == loggedContinue.getMaxConsecutively()) {
            int maxConsecutively = loggedContinue.getMaxConsecutively();
            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                if (maxConsecutively == 1) {
                    registerAwardIfNotExistAndSendMessage(user, LOGIN_1);
                } else if (maxConsecutively == 3) {
                    registerAwardIfNotExistAndSendMessage(user, LOGIN_3);
                } else if (maxConsecutively == 5) {
                    registerAwardIfNotExistAndSendMessage(user, LOGIN_5);
                }
            }
        }
    }

    @Override
    @Transactional
    public void awardCheckFollow(Long userId) {
        int size = followRepository.findFollowerDataByFollowingId(userId).size();
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            if (size >= 1) {
                registerAwardIfNotExistAndSendMessage(user, FOLLOWER_1);
            }
            if (size >= 10) {
                registerAwardIfNotExistAndSendMessage(user, FOLLOWER_10);
            }
            if (size >= 100) {
                registerAwardIfNotExistAndSendMessage(user, FOLLOWER_100);
            }
        }
    }

    //TODO 게임 끝나고 해당 메소드 호출 필요, 필요시 매개변수 수정!!!
    @Override
    @Transactional
    public void awardCheckMedal(Long userId) {
        Medal medal = medalRepository.findById(userId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if (medal != null && user != null) {
            int gold = medal.getGold();
            int silver = medal.getSilver();
            int bronze = medal.getBronze();

            if (gold == 1) {
                registerAwardIfNotExistAndSendMessage(user, GOLD_1);
            } else if (gold == 10) {
                registerAwardIfNotExistAndSendMessage(user, GOLD_10);
            }

            if (silver == 1) {
                registerAwardIfNotExistAndSendMessage(user, SILVER_1);
            } else if (silver == 2) {
                registerAwardIfNotExistAndSendMessage(user, SILVER_22);
            }

            if (bronze == 1) {
                registerAwardIfNotExistAndSendMessage(user, BRONZE_1);
            }
            if (bronze == 33) {
                registerAwardIfNotExistAndSendMessage(user, BRONZE_33);
            }
        }
    }

    @Override
    @Transactional
    public void awardCheckWorkout(Long userId, int workoutId, double score) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            if (workoutId == SQUAT) {
                if (score >= 20) {
                    registerAwardIfNotExistAndSendMessage(user, SQUAT_20);
                }
                if (score >= 40) {
                    registerAwardIfNotExistAndSendMessage(user, SQUAT_40);
                }
            } else if (workoutId == PUSH_UP) {
                if (score >= 20) {
                    registerAwardIfNotExistAndSendMessage(user, PUSHUP_20);
                }
                if (score >= 40) {
                    registerAwardIfNotExistAndSendMessage(user, PUSHUP_40);
                }
            } else if (workoutId == BURPEE) {
                if (score >= 20) {
                    registerAwardIfNotExistAndSendMessage(user, BURPEE_20);
                }
                if (score >= 40) {
                    registerAwardIfNotExistAndSendMessage(user, BURPEE_40);
                }
            } else if (workoutId == PLANK) {
                if (score >= 1.0) {
                    registerAwardIfNotExistAndSendMessage(user, PLANK_1);
                }
                if (score >= 2.0) {
                    registerAwardIfNotExistAndSendMessage(user, PLANK_2);
                }
            }
        }
    }

    @Override
    public ArrayList<AwardDto> getAwards(Long userId) {
        return userAwardRepository.findUserAwards(userId);
    }

    private void registerAwardIfNotExistAndSendMessage(User user, String awardName) {
        Award award = awardRepository.findByEventName(awardName);
        if (award != null && userAwardRepository.findByUserIdAndAwardId(user.getId(), award.getId()) == null) {
            UserAward userAward = new UserAward(award, user, LocalDateTime.now());
            userAwardRepository.save(userAward);
            notificationService.registerAwardNotification(user, award);
        }
    }
}
