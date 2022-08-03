package com.wetness.model.service;

import com.wetness.db.entity.Follow;
import com.wetness.db.entity.User;
import com.wetness.db.entity.composite.FollowId;
import com.wetness.db.repository.FollowRepository;
import com.wetness.db.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.PropertySource;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class FollowServiceTest {

    @Autowired
    public FollowService followService;
    @Autowired
    public FollowRepository followRepository;
    @Autowired
    public UserRepository userRepository;

    @Test
    public void saveFollow(){
        User User1 = userRepository.getOne(28L);
        User User2 = userRepository.getOne(29L);
        Follow follow = new Follow(User1, User2, LocalDateTime.now());
        followService.save(follow);
    }

    @Test
    public void findByFollowerId() {
        ArrayList<Follow> byFollowerId = followRepository.findByFollowerId(28L);
        org.assertj.core.api.Assertions.assertThat(!byFollowerId.isEmpty());
        for (Follow f: byFollowerId) {
            System.out.println(f);
        }
    }


    @Test
    public void findByFollowerIdAndFollowingId() {
        User user1 = userRepository.getOne(32L);
        User user2 = userRepository.getOne(33L);
        Follow f = followRepository.findByFollowerIdAndFollowingId(user1.getId(), user2.getId());
        org.assertj.core.api.Assertions.assertThat(f).isNotNull();
    }
}