package com.wetness.db.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
// TODO : 사용여부 논의 후 삭제
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="room_user")
public class RoomUser {

    @Id @GeneratedValue
    private long id;
    private long roomId;
    private long userId;
    private Timestamp enterTime;
    private Timestamp leaveTime;

}
