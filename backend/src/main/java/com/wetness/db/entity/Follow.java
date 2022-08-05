package com.wetness.db.entity;

import com.wetness.db.entity.composite.FollowId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(FollowId.class)
public class Follow {

    @Id
    @ManyToOne
    @JoinColumn(name ="follower_id")
    private User follower;

    @Id
    @ManyToOne
    @JoinColumn(name ="following_id")
    private User following;

    private LocalDateTime followDate;
}
