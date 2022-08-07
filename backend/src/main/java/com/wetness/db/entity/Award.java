package com.wetness.db.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Award {
    @Id
    @GeneratedValue
    private Long id;

    private String eventName;
    private String detail;
}
