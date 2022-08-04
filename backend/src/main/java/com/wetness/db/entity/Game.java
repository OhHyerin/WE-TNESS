package com.wetness.db.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="game")
public class Game {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "room_id")
    private long roomId;  //refactor 필요! -> class Room 을 참조하도록
/***
 * @ManyToOne
 * @JoinColumn(name="room_id")
 * private Room room;
 * ***/

    @Column(name = "create_date")
    private LocalDateTime createDate;
    @Column(name = "terminate_date")
    private LocalDateTime terminateDate;
    private Game(GameBuilder builder){
        this.id = builder.id;
        this.roomId = builder.roomId;
        this.createDate = builder.createDate;
        this.terminateDate = builder.terminateDate;
    }

    public static class GameBuilder{
        private long id;
        private long roomId;
        private LocalDateTime createDate;
        private LocalDateTime terminateDate;

        public GameBuilder(){}
        public GameBuilder buildIds(long roomId){
            this.roomId = roomId;
            return this;
        }
        public GameBuilder buildCreateTime(int[] created){
            this.createDate = LocalDateTime.of(created[0],created[1],created[2],created[3],created[4],created[5]);
            return this;
        }

        public GameBuilder buildTerminateTime(int[] terminating){
            this.terminateDate = LocalDateTime.of(terminating[0],terminating[1],terminating[2],
                    terminating[3],terminating[4],terminating[5]);
            return this;
        }

        public Game getGame(){
            return new Game(this);
        }
    }//end GameBuilder Class
}
