package com.wetness.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ManyToAny;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="user_game")
public class UserGame {
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
    private int rank;

    private UserGame(UserGameBuilder builder){
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
        public UserGame getGame(){
            return new UserGame(this);
        }
    }
}
