package com.wetness.db.repository;

import com.wetness.db.entity.Report;
import com.wetness.model.dto.response.ReportDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("select r.id as id, u1.nickname as reporter, u2.nickname as accused, r.content as content, r.reportDate as reportDate " +
            "from Report r join User u1 on r.reporter.id = u1.id join User u2 on r.accused.id = u2.id ")
    ArrayList<ReportDto> findReports();

    @Query("select r.id as id, u1.nickname as reporter, u2.nickname as accused, r.content as content, r.reportDate as reportDate " +
            "from Report r join User u1 on r.reporter.id = u1.id join User u2 on r.accused.id = u2.id " +
            "where r.process = :process")
    ArrayList<ReportDto> findProcessReports(@Param("process") boolean process);
}
