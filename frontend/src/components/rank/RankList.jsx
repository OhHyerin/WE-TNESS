import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

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
      {testRanks.length ? (
        testRanks.map((user, i) => <RankItem key={i} user={user} />)
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
    <Grid container>
      <Grid xs={4}>{user.rank}</Grid>
      <Grid xs={4}>{user.userNickname}</Grid>
      <Grid xs={4}>{user.calories}</Grid>
    </Grid>
  );
}

const testRanks = [
  {
    userNickname: 'ninoname',
    address: null,
    calorie: 500.0,
    date: '2022-08-08',
  },
  {
    userNickname: 'ninoname',
    address: null,
    calorie: 500.0,
    date: '2022-08-08',
  },
  {
    userNickname: 'ninoname',
    address: null,
    calorie: 400.0,
    date: '2022-08-08',
  },
  {
    userNickname: 'ninoname',
    address: null,
    calorie: 400.0,
    date: '2022-08-08',
  },
  {
    userNickname: 'ninoname',
    address: null,
    calorie: 300.0,
    date: '2022-08-08',
  },
  {
    userNickname: 'ninoname',
    address: null,
    calorie: 300.0,
    date: '2022-08-08',
  },
  {
    userNickname: 'ninoname',
    address: null,
    calorie: 200.0,
    date: '2022-08-08',
  },
  {
    userNickname: 'ninoname',
    address: null,
    calorie: 200.0,
    date: '2022-08-08',
  },
  {
    userNickname: 'ninoname',
    address: null,
    calorie: 100.0,
    date: '2022-08-08',
  },
  {
    userNickname: 'ninoname',
    address: null,
    calorie: 100.0,
    date: '2022-08-08',
  },
];
