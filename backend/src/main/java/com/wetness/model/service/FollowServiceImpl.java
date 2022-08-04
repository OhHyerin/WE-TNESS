package com.wetness.model.service;

import com.wetness.db.entity.Follow;
import com.wetness.db.entity.User;
import com.wetness.db.repository.FollowRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.model.dto.response.FollowUserResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public boolean removeFollow(String followerNickname, String followingNickname) {
        User follower = userRepository.findByNickname(followerNickname);
        User following = userRepository.findByNickname(followingNickname);
        Follow follow = followRepository.findByFollowerIdAndFollowingId(follower.getId(), following.getId());
        if (follow == null) {
            return false;
        }
        followRepository.delete(follow);
        return true;
    }

    @Override
    @Transactional
    public boolean registerFollow(String followerNickname, String followingNickname) {
        User follower = userRepository.findByNickname(followerNickname);
        User following = userRepository.findByNickname(followingNickname);
        if (follower == null || following == null || followerNickname.equals(followingNickname)) {
            return false;
        }
        Follow follow = followRepository.findByFollowerIdAndFollowingId(follower.getId(), following.getId());
        if (follow == null) {
            followRepository.save(new Follow(follower, following, LocalDateTime.now()));
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public FollowUserResDto getFollowers(Long followerId) {
        ArrayList<String> byFollowerId = followRepository.findFollowingNicknameByFollowerId(followerId);
        return new FollowUserResDto(byFollowerId);
    }
}
