package com.wetness.db.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue // DB AUTO_INCREMENT 작업을 DB 테이블에서 수행 - application.properties 에서 속성 추가됨.
    private Long id;

    private String email;
    private String password;
    @Column(name = "nickname")
    private String nickname;

    private String sidoCode;
    private String gugunCode;

    private String gender;
    private Double height;
    private Double weight;
    private String social;
    //    @Enumerated(EnumType.STRING)
    private String role;
    private String socialToken;
    private String refreshToken;

    private boolean banState;
    private Date banDate;

    public User() {
    }

    public User(String email, String password, String nickname, String gender, Double height, Double weight, String social, String role) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.social = social;
        this.role = role;
    }
}
