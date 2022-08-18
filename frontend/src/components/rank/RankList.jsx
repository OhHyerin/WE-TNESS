import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled as styledC } from '@mui/material/styles';

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
  const ranks = useSelector(state => state.rank.rankList.ranks);
  const message = useSelector(state => state.rank.rankList.message);

  return (
    <div style={{ width: '100%' }}>
      {message === 'NO_GUGUN_INFO' ? (
        <NoRankBox>
          <div>지역정보 없음</div>
          <div>지역을 등록하여 같은 지역 주민들과 경쟁해보세요!</div>
          <Link to="/edit">정보 수정하기</Link>
        </NoRankBox>
      ) : ranks.length ? (
        <Grid container spacing={1}>
          <Grid xs={12}>
            <Box
              sx={{
                padding: '30px 0px',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '20px',
              }}>
              {ranks.map((user, i) => (
                <RankItem key={i} rank={i + 1} user={user} />
              ))}
            </Box>
          </Grid>
        </Grid>
      ) : (
        <NoRankBox>랭킹정보 없음</NoRankBox>
      )}
    </div>
  );
}

const Item = styledC(Paper)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function RankItem({ user, rank }) {
  switch (rank) {
    case 1:
      return (
        <Item
          sx={{ border: 'gold 3px solid', display: 'flex', height: '85px', alignItems: 'center', fontWeight: 'bold' }}
          elevation={4}>
          <Grid sx={{ textAlign: 'start', paddingLeft: '40px', fontSize: '22px' }} xs={4}>
            {rank}
          </Grid>
          <Grid sx={{ textAlign: 'start' }} xs={4}>
            {user.userNickname}
          </Grid>
          <Grid xs={4}>{user.calorie.toFixed(2)} kcal</Grid>
        </Item>
      );
    case 2:
      return (
        <Item
          sx={{ border: 'silver 3px solid', display: 'flex', height: '83px', alignItems: 'center', fontWeight: 'bold' }}
          elevation={4}>
          <Grid sx={{ textAlign: 'start', paddingLeft: '40px', fontSize: '20px' }} xs={4}>
            {rank}
          </Grid>
          <Grid sx={{ textAlign: 'start' }} xs={4}>
            {user.userNickname}
          </Grid>
          <Grid xs={4}>{user.calorie.toFixed(2)} kcal</Grid>
        </Item>
      );
    case 3:
      return (
        <Item
          sx={{
            border: '#CD7F32 2px solid',
            display: 'flex',
            height: '80px',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
          elevation={4}>
          <Grid sx={{ textAlign: 'start', paddingLeft: '40px', fontSize: '18px' }} xs={4}>
            {rank}
          </Grid>
          <Grid sx={{ textAlign: 'start' }} xs={4}>
            {user.userNickname}
          </Grid>
          <Grid xs={4}>{user.calorie.toFixed(2)} kcal</Grid>
        </Item>
      );
    default:
      return (
        <Item sx={{ display: 'flex', height: '80px', alignItems: 'center' }} elevation={4}>
          <Grid sx={{ textAlign: 'start', paddingLeft: '40px' }} xs={4}>
            {rank}
          </Grid>
          <Grid sx={{ textAlign: 'start' }} xs={4}>
            {user.userNickname}
          </Grid>
          <Grid xs={4}>{user.calorie.toFixed(2)} kcal</Grid>
        </Item>
      );
  }
}
