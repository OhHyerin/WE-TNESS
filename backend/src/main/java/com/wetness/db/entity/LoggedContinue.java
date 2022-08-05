package com.wetness.db.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoggedContinue {

    @Id
    private Long userId;

    private int consecutively;
    private int maxConsecutively;
    private LocalDate recentDate;

}
