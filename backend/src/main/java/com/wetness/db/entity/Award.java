package com.wetness.db.entity;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Award {

    @Id @GeneratedValue
    private Long id;

    private String eventName;
    private String detail;

}
