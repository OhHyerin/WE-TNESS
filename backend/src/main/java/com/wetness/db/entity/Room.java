package com.wetness.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name="room")
public class Room {

    @Id @GeneratedValue
    private long id;
    private String title;
    private String password;
    @Column(name="workout_id")
    private int workoutId;
    private boolean isLocked;
    private Timestamp createDate;
    private Timestamp terminateDate;
    private long manager_id;

}