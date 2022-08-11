package com.wetness.model.service;

import com.wetness.db.entity.Report;
import com.wetness.db.repository.ReportRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.model.dto.response.ReportDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public boolean reportUser(String reporterNickname, String accusedNickname, String content) {
        Report report = new Report();
        report.setReporter(userRepository.findByNickname(reporterNickname));
        report.setAccused(userRepository.findByNickname(accusedNickname));
        report.setContent(content);
        report.setReportDate(LocalDateTime.now());
        reportRepository.save(report);
        return true;
    }

    @Override
    @Transactional
    public ArrayList<ReportDto> getReports(Boolean process) {
        if (process == null) {
            return reportRepository.findReports();
        } else {
            return reportRepository.findProcessReports(process);
        }
    }

    @Override
    @Transactional
    public boolean processReport(Long reportId) {
        Optional<Report> byId = reportRepository.findById(reportId);
        if (byId.isPresent()) {
            byId.get().setProcess(true);
            return true;
        }
        return false;
    }
}
