package com.wetness.db.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="medal")
public class Medal {
    @Id @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    private int gold;
    private int silver;
    private int bronze;

    public void setUser(User user) {
        this.user = user;
    }
}
