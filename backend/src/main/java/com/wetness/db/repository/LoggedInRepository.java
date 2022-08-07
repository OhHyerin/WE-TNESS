package com.wetness.db.repository;

import com.wetness.db.entity.LoggedIn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoggedInRepository extends JpaRepository<LoggedIn, Long> {
}
