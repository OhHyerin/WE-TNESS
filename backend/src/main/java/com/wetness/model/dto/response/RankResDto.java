package com.wetness.model.dto.response;

import com.wetness.db.entity.Rank;
import lombok.Data;

import java.util.List;

@Data
public class RankResDto {

     String message;
     List<Rank> ranks;

     public RankResDto(List<Rank> ranks) {
          this.ranks = ranks;

          if(ranks.isEmpty()) this.message = "주소 정보가 없습니다.";
          else this.message = "success";

     }
}
