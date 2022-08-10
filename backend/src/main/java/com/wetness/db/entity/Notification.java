package com.wetness.db.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@Data
public class Notification {

    @Id
    @GeneratedValue
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    User receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    User sender;

    LocalDateTime notifyDate;
    boolean checked;
    String notifyType;
    String roomCode;
    Long badgeId;
}
