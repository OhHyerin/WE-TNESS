package com.wetness.db.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="room")
public class Room {

    @Id @GeneratedValue
    private long id;
    private String title;
    private String password;
    private int workoutId;
    private boolean isLocked;
    private Timestamp createDate;
    private Timestamp terminateDate;
    private long managerId;

}
