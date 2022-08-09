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
  gap: 10px;
`;
const BigBox = styled.div`
  display: flex;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
`;

const RankBox = styled.div`
  width: 50%;
`;

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
          <h1>랭킹</h1>
          <BtnBox>
            <Button
              variant={squat ? 'contained' : 'outlined'}
              onClick={() => {
                setSquat(!squat);
              }}>
              스쿼트
            </Button>
            <Button
              variant={pushup ? 'contained' : 'outlined'}
              onClick={() => {
                setPushup(!pushup);
              }}>
              팔굽혀펴기
            </Button>
            <Button
              variant={burpee ? 'contained' : 'outlined'}
              onClick={() => {
                setBurpee(!burpee);
              }}>
              버핏
            </Button>
            <Button
              variant={plank ? 'contained' : 'outlined'}
              onClick={() => {
                setPlank(!plank);
              }}>
              플랭크
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
          <RankList />
        </RankBox>
      </BigBox>
    );
  }
  return <Navigate to="/login" />;
}
