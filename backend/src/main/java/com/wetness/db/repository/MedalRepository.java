package com.wetness.db.repository;

import com.wetness.db.entity.Medal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedalRepository extends JpaRepository<Medal, Long> {
}
