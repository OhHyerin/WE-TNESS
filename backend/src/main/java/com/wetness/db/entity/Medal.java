package com.wetness.db.entity;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="medal")
public class Medal {
    @Id @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    private int gold;
    private int silver;
    private int bronze;
}
