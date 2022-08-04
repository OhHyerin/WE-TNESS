package com.wetness.db.entity;

import lombok.*;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity(name = "user_award")
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserAward {

    @ManyToOne
    @JoinColumn(name="award")
    private Award award;

    @ManyToOne
    @JoinColumn(name="user")
    private User user;

    private LocalDateTime receiveDate;

}
