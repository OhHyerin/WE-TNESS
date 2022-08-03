package com.wetness.model.service;

import com.wetness.db.entity.Medal;
import com.wetness.db.repository.MedalRepository;
import com.wetness.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("medalService")
public class MedalServiceImpl implements MedalService{

    @Autowired
    MedalRepository medalRepo;

    @Autowired
    UserRepository userRepo;

    @Override
    public void insertMedal(Medal medal, UserDetailsImpl user) {
        medal.setUser(userRepo.findById(user.id()).get());
        medalRepo.save(medal);
    }
}
