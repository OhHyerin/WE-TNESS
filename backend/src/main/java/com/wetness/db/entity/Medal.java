package com.wetness.db.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="medal")
public class Medal {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name="user_id")
    private User user;

    private int gold;
    private int silver;
    private int bronze;

    public void setUser(User user) {
        this.user = user;
    }
}
