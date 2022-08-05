package com.wetness.db.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class Report {

    @Id
    @GeneratedValue
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    User reporter;

    @ManyToOne(fetch = FetchType.LAZY)
    User accused;

    String content;
    LocalDateTime reportDate;
    boolean process;
}
