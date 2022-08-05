package com.wetness.model.dto.response;

import com.wetness.db.entity.Rank;
import lombok.Data;

import java.util.List;

@Data
public class RankResDto {

     String message;
     List<Rank> squatRanks;
     List<Rank> pushUpRanks;
     List<Rank> burpeeRanks;
     List<Rank> plankRanks;

     List<Rank> regionSquatRanks;
     List<Rank> regionPushUpRanks;
     List<Rank> regionBurpeeRanks;
     List<Rank> regionPlankRanks;

     public RankResDto(String message, List<Rank> squatRanks, List<Rank> pushUpRanks, List<Rank> burpeeRanks, List<Rank> plankRanks) {
          this.message = message;
          this.squatRanks = squatRanks;
          this.pushUpRanks = pushUpRanks;
          this.burpeeRanks = burpeeRanks;
          this.plankRanks = plankRanks;
     }

     public RankResDto(String message, List<Rank> squatRanks, List<Rank> pushUpRanks, List<Rank> burpeeRanks, List<Rank> plankRanks, List<Rank> regionSquatRanks, List<Rank> regionPushUpRanks, List<Rank> regionBurpeeRanks, List<Rank> regionPlankRanks) {
          this.message = message;
          this.squatRanks = squatRanks;
          this.pushUpRanks = pushUpRanks;
          this.burpeeRanks = burpeeRanks;
          this.plankRanks = plankRanks;
          this.regionSquatRanks = regionSquatRanks;
          this.regionPushUpRanks = regionPushUpRanks;
          this.regionBurpeeRanks = regionBurpeeRanks;
          this.regionPlankRanks = regionPlankRanks;
     }
}
