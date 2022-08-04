package com.wetness.model.service;

import com.wetness.db.entity.Follow;
import com.wetness.db.entity.User;
import com.wetness.db.repository.FollowRepository;
import com.wetness.db.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
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
        User user1 = userRepository.getOne(28L);
        User user2 = userRepository.getOne(29L);
        followService.registerFollow(user1.getNickname(), user2.getNickname());
    }

    @Test
    public void findByFollowerId() {
        ArrayList<String> byFollowerId = followRepository.findFollowingNicknameByFollowerId(33L);
        assertThat(byFollowerId).isNotEmpty();
        for (String f: byFollowerId) {
            System.out.println(f);
        }
    }

    @Test
    public void findByFollowerIdAndFollowingId() {
        User user1 = userRepository.getOne(32L);
        User user2 = userRepository.getOne(33L);
        Follow f = followRepository.findByFollowerIdAndFollowingId(user1.getId(), user2.getId());
        assertThat(f).isNotNull();
    }
}