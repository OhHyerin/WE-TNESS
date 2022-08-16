import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NoRankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px;
  gap: 20px;
  font-size: large;
`;

export default function RankList({ isRegion }) {
  const ranks = useSelector(state => state.rank.ranks);
  const ranksLength = ranks?.length;

  const message = useSelector(state => state.rank.message);

  return (
    <div>
      {ranksLength ? (
        ranks.map((user, i) => <RankItem key={i} user={user} />)
      ) : message === 'NO_GUGUN_INFO' ? (
        <NoRankBox>
          <div>지역정보 없음</div>
          <div>지역을 등록하여 같은 지역 주민들과 경쟁해보세요!</div>
          <Link to="/edit">정보 수정하기</Link>
        </NoRankBox>
      ) : (
        <NoRankBox>랭킹정보 없음</NoRankBox>
      )}
    </div>
  );
}

function RankItem({ user }) {
  return (
    <div>
      <p>{user.rank}</p>
      <p>{user.nickname}</p>
      <p>{user.calories}</p>
    </div>
  );
}
