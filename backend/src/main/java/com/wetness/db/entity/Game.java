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

    @ManyToOne
    @JoinColumn(name="room_id")
    private Room room;

    @Column(name = "create_date")
    private LocalDateTime createDate;
    @Column(name = "terminate_date")
    private LocalDateTime terminateDate;

    @Column(name="is_playing")
    private Boolean isPlaying;

    private Game(GameBuilder builder){
        this.id = builder.id;
        this.room = builder.room;
        this.createDate = builder.createDate;
        this.terminateDate = builder.terminateDate;
        this.isPlaying = builder.isPlaying;
    }

    public void setTerminateDate(int[] terminating){
        this.terminateDate = LocalDateTime.of(terminating[0],terminating[1],terminating[2],
                terminating[3],terminating[4],terminating[5]);
    }

    public void setIsPlaying(Boolean isPlaying){
        this.isPlaying = isPlaying;
    }

    public static class GameBuilder{
        private long id;
        private Room room;
        private LocalDateTime createDate;
        private LocalDateTime terminateDate;
        private boolean isPlaying;

        public GameBuilder(){}
        public GameBuilder buildRoom(Room room){
            this.room = room;
            return this;
        }
        public GameBuilder buildCreateTime(int[] created){
            this.createDate = LocalDateTime.of(created[0],created[1],created[2],
                    created[3],created[4],created[5]);
            return this;
        }

        public GameBuilder buildTerminateTime(int[] terminating){
            this.terminateDate = LocalDateTime.of(terminating[0],terminating[1],terminating[2],
                    terminating[3],terminating[4],terminating[5]);
            return this;
        }

        public GameBuilder buildIsPlaying(Boolean isPlaying){
            this.isPlaying = isPlaying;
            return this;
        }
        public Game getGame(){
            return new Game(this);
        }
    }//end GameBuilder Class
}
