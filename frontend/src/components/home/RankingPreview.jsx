import styled from 'styled-components';
import './RankingPreview.css';

const PriviewBanner = styled.div`
  padding: 30px;
`;

export default function RankingPreview() {
  return (
    <PriviewBanner>
      <div class="center">
        <div class="carousel">
          <div class="pre">실시간 랭킹</div>
          <div class="change_outer">
            <div class="change_inner">
              <div class="element">
                <p>전체</p>
              </div>
              <div class="element">
                <p>스쿼트</p>
              </div>
              <div class="element">
                <p>팔굽혀펴기</p>
              </div>
              <div class="element">
                <p>버피</p>
              </div>
              <div class="element">
                <p>런지</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PriviewBanner>
  );
}
