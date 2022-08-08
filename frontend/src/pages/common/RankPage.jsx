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

  const region = useSelector(state => state.rank.region);

  const [pushup, setPushup] = useState(true);
  const [burpee, setBurpee] = useState(false);
  const [squat, setSquat] = useState(false);
  const [plank, setPlank] = useState(false);
  const [isRegion, setIsRegion] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      const payload = {
        pushup: true,
        burpee: false,
        squat: false,
        plank: false,
        isRegion: false,
      };
      dispatch(fetchRankList(payload));
    }
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setIsRegion(!isRegion);
    onClickBtn(e);
  }

  function onClickBtn(e) {
    const payload = {
      pushup,
      burpee,
      squat,
      plank,
      isRegion,
    };
    dispatch(fetchRankList(payload));
  }
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  if (isAuthenticated) {
    return (
      <BigBox>
        <RankBox>
          <h1>랭킹</h1>
          <BtnBox>
            <Button
              variant={pushup ? 'contained' : 'outlined'}
              onClick={() => {
                setPushup(!pushup);
                onClickBtn();
              }}>
              팔굽혀펴기
            </Button>
            <Button
              variant={burpee ? 'contained' : 'outlined'}
              onClick={() => {
                setBurpee(!burpee);
                onClickBtn();
              }}>
              버핏
            </Button>
            <Button
              variant={squat ? 'contained' : 'outlined'}
              onClick={() => {
                setSquat(!squat);
                onClickBtn();
              }}>
              스쿼트
            </Button>
            <Button
              variant={plank ? 'contained' : 'outlined'}
              onClick={() => {
                setPlank(!plank);
                onClickBtn();
              }}>
              플랭크
            </Button>
          </BtnBox>
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked />}
              onChange={handleChange}
              label="우리 지역"
              labelPlacement="start"
            />
          </FormGroup>
          {region ? <p>{region} ^~^</p> : <p>하이여</p>}
          <RankList />
        </RankBox>
      </BigBox>
    );
  }
  return <Navigate to="/login" />;
}
