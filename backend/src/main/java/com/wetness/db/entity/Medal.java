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

//    @Id
//    private Long id;
//
//    @OneToOne
//    @MapsId
//    @JoinColumn(name="user_id")
//    private User user;
//    객체를 id로 하니까 repository.save가 잘 안돼서, 일단 Long userId로 해놓았다

    @Id
    private Long userId;

    private int gold;
    private int silver;
    private int bronze;

}
