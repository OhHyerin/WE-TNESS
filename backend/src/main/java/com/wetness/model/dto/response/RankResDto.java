package com.wetness.model.dto.response;

import com.wetness.db.entity.Rank;
import lombok.Data;

import java.util.List;

@Data
public class RankResDto {

     String message;
     List<RankResultResDto> ranks;


     public RankResDto(String message, List<RankResultResDto> ranks) {
          this.message = message;
          this.ranks = ranks;
     }

}
