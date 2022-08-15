package com.wetness.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="game_record")
public class GameRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name="game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name="workout_id")
    private Workout workout;

    private double score;  //몇 분
    @Column(name="`rank`")
    private int rank;




//여기
    public void setId(long id) {
        this.id = id;
    }

    private GameRecord(UserGameBuilder builder){
        this.id = builder.id;
        this.user = builder.user;
        this.game = builder.game;
        this.workout = builder.workout;
        this.score = builder.score;
        this.rank = builder.rank;
    }

    public static class UserGameBuilder{
        private long id;
        private User user;
        private Game game;
        private Workout workout;
        private double score;
        private int rank;

        public UserGameBuilder(){}

        public UserGameBuilder buildUser(User user){
            this.user = user;
            return this;
        }
        public UserGameBuilder buildGame(Game game){
            this.game = game;
            return this;
        }

        public UserGameBuilder buildWorkout(Workout workout){
            this.workout = workout;
            return this;
        }
        public UserGameBuilder buildScore(double score){
            this.score = score;
            return this;
        }
        public UserGameBuilder buildRank(int rank){
            this.rank = rank;
            return this;
        }
        public GameRecord getUserGame(){
            return new GameRecord(this);
        }

    }
}
