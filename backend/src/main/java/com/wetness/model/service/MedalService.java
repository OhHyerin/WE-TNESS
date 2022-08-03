package com.wetness.model.service;

import com.wetness.db.entity.Medal;

public interface MedalService {
    void insertMedal(Medal medal, UserDetailsImpl user);
}
