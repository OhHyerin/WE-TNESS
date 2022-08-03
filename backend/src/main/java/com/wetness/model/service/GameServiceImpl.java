package com.wetness.model.service;

import com.wetness.db.entity.*;
import com.wetness.db.repository.*;
import com.wetness.model.dto.request.DiaryReqDto;
import com.wetness.model.dto.request.GameReqDto;
import com.wetness.model.dto.request.GameResultReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("gameService")
public class GameServiceImpl implements GameService{

    @Autowired
    GameRepository gameRepo;
    @Autowired
    GameRecordRepository gameRecordRepo;
    @Autowired
    UserRepository userRepo;
    @Autowired
    WorkoutRepository workoutRepo;

    @Autowired
    DiaryRepository diaryRepo;

    @Autowired
    MedalRepository medalRepo;
    @Autowired
    RankRepository rankRepo;


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

        GameRecord gameResult = new GameRecord.UserGameBuilder().buildUser(resultOwner).
                buildGame(game).buildWorkout(workout).buildScore(result.getScore()).
                buildRank(result.getRank()).getUserGame();

        Long userGameId = gameRecordRepo.save(gameResult).getId();

        gameResult.setId(userGameId);

        //this.insertRank(gameResult);

        if(gameResult.getRank()>=3){
            this.insertMedal(gameResult);
        }


        return userGameId;
    }

    @Override
    public void insertDiary(DiaryReqDto diaryReq, UserDetailsImpl user) {
        User writer = userRepo.findById(user.id()).get();
        GameRecord gameRecord = gameRecordRepo.findById(diaryReq.getUserGameId()).get();

        Diary diary = new Diary.DiaryBuilder().buildUser(writer).buildFileName(diaryReq.getFileName()).
                buildDate(diaryReq.getDate()).buildRecord(gameRecord).getDiary();

        diaryRepo.save(diary);
        return;
    }


    void insertMedal(GameRecord gameRecord){
        //다른 service 호출하지 않고, 순환 관계 참조를 막도록 작성

        User user = gameRecord.getUser();

        if(gameRecord.getRank()==1){
            medalRepo.save(new Medal(user,1,0,0));
        }else if(gameRecord.getRank()==2){
            medalRepo.save(new Medal(user,0,1,0));
        }else if(gameRecord.getRank()==3){
            medalRepo.save(new Medal(user,0,0,1));
        }

        return;
    }


/***
    void insertRank(GameRecord gameRecord){

        double calorie = gameRecord.getUser().getWeight() * gameRecord.getWorkout().getMet()
                * gameRecord.getScore();
        Rank rank = new Rank(0,gameRecord.getUser(),gameRecord.getWorkout(),gameRecord.getUser().getSidoCode(),
                gameRecord.getUser().getGugunCode(), calorie, gameRecord.getGame().getTerminateDate());
        rankRepo.save(rank);
        return;
    }
***/

}
