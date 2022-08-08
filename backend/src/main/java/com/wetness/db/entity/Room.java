package com.wetness.db.entity;

import lombok.*;

import javax.persistence.*;
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

    @ManyToOne
    @JoinColumn(name="workout_id")
    private Workout workout;

    private boolean isLocked;
    private Timestamp createDate;
    private Timestamp terminateDate;
    private long managerId;

}
