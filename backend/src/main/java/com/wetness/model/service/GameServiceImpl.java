package com.wetness.model.service;

import com.wetness.db.entity.Game;
import com.wetness.db.repository.GameRepository;
import com.wetness.model.dto.request.GameReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("gameService")
public class GameServiceImpl implements GameService{

    @Autowired
    GameRepository gameRepo;

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
}
