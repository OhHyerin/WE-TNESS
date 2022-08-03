package com.wetness.model.service;

import com.wetness.db.entity.Follow;

import java.util.Collection;

public interface FollowService {

    void save(Follow follow);
    Collection<Follow> findByFollowerId (Long id);

    boolean removeFollow(String followerNickname, String followingNickname);

    boolean registerFollow(String nickname, String nickname1);
}
