package com.wetness.db.entity;

import io.openvidu.java.client.Session;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MapSessionRoom {

    private Room room;
    private Session session;
}
