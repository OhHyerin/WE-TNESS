package com.wetness.db.repository;

import com.wetness.db.entity.Follow;
import com.wetness.db.entity.composite.FollowId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface FollowRepository extends JpaRepository<Follow, FollowId> {

    @Query("select f from Follow f where f.follower.id = :followerId and f.following.id = :followingId")
    Follow findByFollowerIdAndFollowingId(@Param("followerId") Long followerId, @Param("followingId") Long followingId);

    @Query("select u.nickname from Follow f join User u on f.following.id = u.id where f.follower.id = :followerId")
    ArrayList<String> findFollowingNicknameByFollowerId(@Param("followerId") Long followerId);
}
