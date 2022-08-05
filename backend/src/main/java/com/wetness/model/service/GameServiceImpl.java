package com.wetness.model.service;

import com.wetness.db.entity.*;
import com.wetness.db.repository.*;
import com.wetness.model.dto.request.DiaryReqDto;
import com.wetness.model.dto.request.GameReqDto;
import com.wetness.model.dto.request.GameResultReqDto;
import com.wetness.model.dto.request.TerminateGameDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Autowired
    RoomRepository roomRepo;


    @Override
    public Long startGame(GameReqDto gameReqDto, Long userId) {
        System.out.println(gameReqDto.getRoomId()+" ================gameServiceImpl startGame 함수");

        Room room = roomRepo.findById(gameReqDto.getRoomId()).get();

        //userId validation 체크 추가하기 -> Room 생성할 때 생성한 user 정보가 없어서 애매함
        
        Game game = new Game.GameBuilder().buildRoom(room).
                buildCreateTime(gameReqDto.getCreateDate()).buildIsPlaying(true)
                .getGame();


        Long gameId = gameRepo.save(game).getId();
        return gameId;
    }

    @Override
    public void terminateGame(GameResultReqDto result, Long userId) {
        Game game = gameRepo.findById(result.getGameId()).get();
        game.setTerminateDate(result.getTerminateDate());
        return;
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

        this.insertRank(gameResult);

//        if(gameResult.getRank()<=3){
//            this.insertMedal(gameResult);
//        }


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
            System.out.println("1등해서 메달 땀==================================");
            medalRepo.save(new Medal(user.getId(),user,1,0,0));
        }else if(gameRecord.getRank()==2){
            medalRepo.save(new Medal(user.getId(),user,0,1,0));
        }else if(gameRecord.getRank()==3){
            medalRepo.save(new Medal(user.getId(),user,0,0,1));
        }

        return;
    }



    void insertRank(GameRecord gameRecord){

        double calorie = gameRecord.getUser().getWeight() * gameRecord.getWorkout().getMet()
                * gameRecord.getScore();

        User user = userRepo.findById(gameRecord.getUser().getId()).get();

        LocalDateTime gameDate = gameRecord.getGame().getTerminateDate();
        LocalDate regDate = LocalDate.of(gameDate.getYear(),gameDate.getMonth(), gameDate.getDayOfMonth());

        int N = (int)gameRecord.getWorkout().getId()-1;

        if(rankRepo.findByUserIdAndWorkoutAndDateGreaterThanEqual(user.getId(), (1<<N), regDate).isPresent()){
            List<Rank> oldList = rankRepo.findByUserIdAndDateGreaterThanEqual(user.getId(), regDate);
            System.out.println(" old List 있음 ========================================");
            for(int i=0; i<oldList.size(); i++){
                Rank old = oldList.get(i);
                if((old.getWorkout() & (1<<N) )== 0) continue;
                old.setCalorie(old.getCalorie()+calorie);
                rankRepo.save(old);
            }
        }else{
            System.out.println(" new List 삽입 ===============================");
            List<Rank> newList = new ArrayList<>();
            newList.add(new Rank(0L, user, (1<<N), user.getSidoCode(), user.getGugunCode(), calorie, regDate));

            List<Rank> oldList = rankRepo.findByUserIdAndDateGreaterThanEqual(user.getId(), regDate);
            for(int i=0; i<oldList.size(); i++){
                Rank old = oldList.get(i);
                newList.add(new Rank(0L, user, (old.getWorkout()|(1<<N)),user.getSidoCode(),
                        user.getGugunCode(), old.getCalorie()+calorie, regDate));
            }
            rankRepo.saveAll(newList);
        }


        return;
    }



}




/***
//case1 : 이미 해당 운동을 한 적이 있는 경우
        if(oldList.size()>0){
            System.out.println("오늘 이미 한 운동");
            for(int i=0; i<oldList.size(); i++){
                Rank old = oldList.get(i);
                old.setCalorie(old.getCalorie()+calorie);
            }
        }



//case2 : 해당 운동을 오늘 처음하는 경우
        else{
            System.out.println("오늘 처음 하는 운동");
            List<Rank> records = rankRepo.findByUserIdAndDateGreaterThanEqual(user.getId(), regDate);

            List<Rank> newList = new ArrayList<>();

            for(int i=0; i<records.size(); i++){
                Rank old = records.get(i);

                sb = new StringBuilder();
                String tmp = Integer.toBinaryString( (Integer.parseInt(old.getWorkout()) | (1<<N)) );
                for(int j=0; j <( 4 - tmp.length()); j++){
                    sb.append("0");
                }
                sb.append(tmp);
                String n = sb.toString();
                newList.add(new Rank(0L, user, n, user.getSidoCode(), user.getGugunCode(),
                        old.getCalorie()+calorie, regDate ));
            }

            sb = new StringBuilder();
            for(int i=4; i>=0; i--){
                if(i==N){
                    sb.append("1");
                }else{
                    sb.append("0");
                }
            }
            String n = sb.toString();
            newList.add(new Rank(0L,  user, n, user.getSidoCode(), user.getGugunCode(),
                    calorie, regDate));

            rankRepo.saveAll(newList);
        }




        if(rankList.size()==1){
            Rank rank = rankList.get(0);
            rank.setCalorie(rank.getCalorie()+calorie);
        }else if(rankList.size()==0){
           Rank rank = new Rank(0L,gameRecord.getUser(),gameRecord.getWorkout(),gameRecord.getUser().getSidoCode(),
                    gameRecord.getUser().getGugunCode(), calorie, gameRecord.getGame().getTerminateDate());
            rankRepo.save(rank);
        }else{
            System.out.println("rank에 기록이 2개 이상 삽입됨");
        }
***/

