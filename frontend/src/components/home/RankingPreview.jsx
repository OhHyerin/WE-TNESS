import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  fetchTotalRanking,
  fetchSquatRanking,
  fetchPushupRanking,
  fetchBurpeeRanking,
  fetchLungeRanking,
} from '../../features/rank/RankSlice';
import './RankingPreview.css';

const PriviewBanner = styled.div`
  padding: 30px;
`;

export default function RankingPreview() {
  const dispatch = useDispatch();

  const rank = useSelector(state => state.rank.previewRank);

  useEffect(() => {
    dispatch(fetchTotalRanking({ workoutId: [1, 2, 3, 4], selectGugun: false }));
    dispatch(fetchSquatRanking({ workoutId: [1], selectGugun: false }));
    dispatch(fetchPushupRanking({ workoutId: [2], selectGugun: false }));
    dispatch(fetchBurpeeRanking({ workoutId: [3], selectGugun: false }));
    dispatch(fetchLungeRanking({ workoutId: [4], selectGugun: false }));
  }, [dispatch]);

  return (
    <PriviewBanner>
      <div className="center">
        <div className="carousel">
          <div className="pre">실시간 랭킹</div>
          <div className="change_outer">
            <div className="change_inner">
              <div className="element">
                {rank?.total ? (
                  <p>
                    전체 1등 {rank?.total[0]?.userNickname} 2등 {rank.total[1]?.userNickname} 3등{' '}
                    {rank.total[2]?.userNickname}
                  </p>
                ) : (
                  '랭킹없음'
                )}
              </div>
              <div className="element">
                {rank?.squat ? (
                  <p>
                    스쿼트1등 {rank?.squat[0]?.userNickname} 2등 {rank.squat[1]?.userNickname} 3등{' '}
                    {rank.squat[2]?.userNickname}
                  </p>
                ) : (
                  '랭킹없음'
                )}
              </div>
              <div className="element">
                {rank?.pushup ? (
                  <p>
                    팔굽혀펴기 1등 {rank.pushup[0]?.userNickname} 2등 {rank.pushup[1]?.userNickname} 3등{' '}
                  </p>
                ) : (
                  '랭킹없음'
                )}
              </div>
              <div className="element">
                {rank?.burpee ? (
                  <p>
                    버피 1등 {rank.burpee[0]?.userNickname} 2등 {rank.burpee[1]?.userNickname} 3등{' '}
                    {rank.burpee[2]?.userNickname}
                  </p>
                ) : (
                  '랭킹없음'
                )}
              </div>
              <div className="element">
                {rank?.lunge ? (
                  <p>
                    런지 1등 {rank.lunge[0]?.userNickname} 2등 {rank.lunge[1]?.userNickname} 3등{' '}
                    {rank.lunge[2]?.userNickname}
                  </p>
                ) : (
                  '랭킹없음'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PriviewBanner>
  );
}
