package com.wetness.db.entity;

import com.wetness.db.entity.composite.UserAwardId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(UserAwardId.class)
public class UserAward {

    @Id
    @ManyToOne
    @JoinColumn(name = "award_id")
    private Award award;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime receiveDate;

}
