package com.wetness.db.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class CommonCode {

    @Id
    private String code;

    private String category;
    private String name;
}
