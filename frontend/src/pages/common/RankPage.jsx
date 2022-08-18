import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FormGroup, FormControlLabel, Switch, Button } from '@mui/material';
import { getAccessToken } from '../../features/Token';
import { fetchRankList } from '../../features/rank/RankSlice';
import RankList from '../../components/rank/RankList';

const BtnBox = styled.div`
  display: flex;
  width: 100%;
  padding: 100px 0px;
`;

const BigBox = styled.div`
  display: flex;
  padding-top: 50px;
  justify-content: center;
  align-items: center;
`;

const RankBox = styled.div`
  width: 50%;
`;

const Title = styled.p`
  font-size: 100px;
  text-align: center;
`;

const BtnStyle = {
  width: '149.5px',
  height: '59px',
  borderRadius: '0px',
};

export default function RankPage() {
  const dispatch = useDispatch();

  const [squat, setSquat] = useState(true);
  const [pushup, setPushup] = useState(false);
  const [burpee, setBurpee] = useState(false);
  const [plank, setPlank] = useState(false);
  const [isRegion, setIsRegion] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      const workoutId = [];
      if (squat) {
        workoutId.push(1);
      }
      if (pushup) {
        workoutId.push(2);
      }
      if (burpee) {
        workoutId.push(3);
      }
      if (plank) {
        workoutId.push(4);
      }
      const payload = {
        workoutId,
        selectGugun: isRegion,
      };
      dispatch(fetchRankList(payload));
    }
  }, [dispatch, squat, pushup, burpee, plank, isRegion]);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  if (isAuthenticated) {
    return (
      <BigBox>
        <RankBox>
          <Title>RANKING</Title>

          <BtnBox>
            <Button
              style={{ borderRadius: '5px 0px 0px 5px' }}
              sx={BtnStyle}
              size="large"
              variant={squat ? 'contained' : 'outlined'}
              onClick={() => {
                setSquat(!squat);
              }}>
              스쿼트
            </Button>
            <Button
              sx={BtnStyle}
              size="large"
              variant={pushup ? 'contained' : 'outlined'}
              onClick={() => {
                setPushup(!pushup);
              }}>
              팔굽혀펴기
            </Button>
            <Button
              size="large"
              sx={BtnStyle}
              variant={burpee ? 'contained' : 'outlined'}
              onClick={() => {
                setBurpee(!burpee);
              }}>
              버피
            </Button>
            <Button
              style={{ borderRadius: '0px 5px 5px 0px' }}
              size="large"
              sx={BtnStyle}
              variant={plank ? 'contained' : 'outlined'}
              onClick={() => {
                setPlank(!plank);
              }}>
              런지
            </Button>
          </BtnBox>
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              onChange={() => {
                setIsRegion(!isRegion);
              }}
              label="우리 지역"
              labelPlacement="start"
            />
          </FormGroup>

          {/* 랭킹정보 */}
          <RankList isRegion={isRegion} />
        </RankBox>
      </BigBox>
    );
  }
  return <Navigate to="/login" />;
}
