package com.wetness.model.service;

import com.wetness.model.dto.response.ReportDto;

import java.util.ArrayList;

public interface ReportService {
    boolean reportUser(String reporterNickname, String accusedNickname, String content);

    ArrayList<ReportDto> getReports(Boolean process);

    boolean processReport(Long reportId);
}
