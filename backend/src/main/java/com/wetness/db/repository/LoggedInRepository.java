package com.wetness.db.repository;

import com.wetness.db.entity.LoggedIn;
import com.wetness.model.dto.response.LoginLogResDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface LoggedInRepository extends JpaRepository<LoggedIn, Long> {

    @Query("select date as date from LoggedIn l where l.user.id = :userId order by l.date")
    ArrayList<LoginLogResDto> getLoginLog(@Param("userId") Long userId);

    @Query("select distinct function('date_format', l.date, '%Y-%m-%d') as date from LoggedIn l where l.user.id = :userId order by l.date")
    ArrayList<String> getLoginDateLog(@Param("userId") Long userId);
}
