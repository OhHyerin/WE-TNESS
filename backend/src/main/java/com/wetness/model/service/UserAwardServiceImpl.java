package com.wetness.model.service;

import com.wetness.db.entity.Award;
import com.wetness.db.entity.User;
import com.wetness.db.entity.UserAward;
import com.wetness.db.repository.AwardRepository;
import com.wetness.db.repository.UserAwardRepository;
import com.wetness.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class UserAwardServiceImpl implements UserAwardService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserAwardRepository userAwardRepository;
    @Autowired
    private AwardRepository awardRepository;

    @Override
    public boolean insert(Award award, long userId) {

//        UserAward userAward = new UserAward(award, );
//        userAwardRepository.save(award, userId);

        return false;
    }
}
