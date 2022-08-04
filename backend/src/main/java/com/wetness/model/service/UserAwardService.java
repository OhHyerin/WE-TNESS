package com.wetness.model.service;

import com.wetness.db.entity.Award;

public interface UserAwardService {

    boolean insert(Award award, long userId);


}
