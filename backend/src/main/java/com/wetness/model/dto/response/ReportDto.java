package com.wetness.model.dto.response;

import java.time.LocalDateTime;

public interface ReportDto {
    Long getId();
    String getReporter();
    String getAccused();
    String getContent();
    LocalDateTime getReportDate();
}
