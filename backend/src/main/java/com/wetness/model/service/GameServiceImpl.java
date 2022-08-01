package com.wetness.model.service;

import com.wetness.db.entity.Game;
import com.wetness.model.dto.request.GameReqDto;
import org.springframework.stereotype.Service;

@Service("gameService")
public class GameServiceImpl implements GameService{

    @Override
    public Long startGame(GameReqDto gameReq) {

        Game game = new Game().GameBuilder(gameReq.getRoomId()).


        return null;
    }
}
