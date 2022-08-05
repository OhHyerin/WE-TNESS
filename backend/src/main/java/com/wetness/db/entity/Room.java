package com.wetness.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name="room")
public class Room {

    @Id @GeneratedValue
    private long id;
    @Column(name="`name`")
    private String title;
    private String password;

    @ManyToOne
    @JoinColumn(name="workout_id")
    private Workout workout;

    @Column(name="is_locked")
    private boolean isLocked;
    @Column(name="create_date")
    private LocalDateTime createDate;
    @Column(name="terminate_date")
    private LocalDateTime terminateDate;

    private long manager_id;

}