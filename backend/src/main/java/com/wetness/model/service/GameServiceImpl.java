package com.wetness.model.service;

import com.wetness.db.entity.Game;
import com.wetness.db.entity.User;
import com.wetness.db.entity.UserGame;
import com.wetness.db.entity.Workout;
import com.wetness.db.repository.GameRepository;
import com.wetness.db.repository.UserGameRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.db.repository.WorkoutRepository;
import com.wetness.model.dto.request.GameReqDto;
import com.wetness.model.dto.request.GameResultReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("gameService")
public class GameServiceImpl implements GameService{

    @Autowired
    GameRepository gameRepo;
    @Autowired
    UserGameRepository userGameRepo;
    @Autowired
    UserRepository userRepo;
    @Autowired
    WorkoutRepository workoutRepo;

    @Override
    public Long startGame(GameReqDto gameReqDto, Long userId) {
        
        //userId validation 체크 추가하기
        Game game = new Game.GameBuilder().buildIds(gameReqDto.getRoomId()).
                buildCreateTime(gameReqDto.getCreateDate()).
                buildTerminateTime(gameReqDto.getTerminateDate())
                .getGame();

        gameRepo.save(game);
        Long gameId = gameRepo.findByRoomIdAndCreateDate(game.getRoomId(),game.getCreateDate()).get(0).getId();
        return gameId;
    }

    @Override
    public Long insertResult(GameResultReqDto result, UserDetailsImpl user) {
        User resultOwner = userRepo.findById(user.id()).get();
        Game game = gameRepo.findById(result.getGameId()).get();
        Workout workout = workoutRepo.findById(result.getWorkoutId()).get();

        UserGame gameResult = new UserGame.UserGameBuilder().buildUser(resultOwner).
                buildGame(game).buildWorkout(workout).buildScore(result.getScore()).
                buildRank(result.getRank()).getUserGame();

        Long userGameId = userGameRepo.save(gameResult).getId();

        return userGameId;
    }
}
