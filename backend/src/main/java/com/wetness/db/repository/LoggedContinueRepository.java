package com.wetness.db.repository;


import com.wetness.db.entity.LoggedContinue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoggedContinueRepository extends JpaRepository<LoggedContinue, Long> {

    LoggedContinue save(LoggedContinue loggedContinue);

    LoggedContinue findByUserId(Long userId);

}
