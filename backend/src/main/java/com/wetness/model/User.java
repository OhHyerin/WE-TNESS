package com.wetness.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;
@Entity
@Data
public class User {

    @Id @GeneratedValue // DB AUTO_INCREMENT 작업을 DB 테이블에서 수행 - application.properties 에서 속성 추가됨.
    private Long id;

    private String email;
    private String password;
    private String nickname;

    private String sidoCode;
    private String gugunCode;

    private String gender;
    private double height;
    private double weight;
    private String social;
    private String role;
    private String socialToken;
    private String refreshToken;

    private boolean banState;
    private Date banDate;

}
