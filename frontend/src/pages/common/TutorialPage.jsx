import { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import camSet1 from '../../assets/images/tutorial/camSet1.PNG';
import camSet2 from '../../assets/images/tutorial/camSet2.PNG';
import camSet3 from '../../assets/images/tutorial/camSet3.PNG';
import camSet4 from '../../assets/images/tutorial/camSet4.PNG';
import camSet5 from '../../assets/images/tutorial/camSet5.PNG';
import camSet6 from '../../assets/images/tutorial/camSet6.PNG';
import squat from '../../assets/images/tutorial/squat.PNG';
import pushup from '../../assets/images/tutorial/pushup.PNG';
import burpee from '../../assets/images/tutorial/burpee.PNG';
import lunge from '../../assets/images/tutorial/lunge.PNG';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const BigTittle = styled.div`
  margin: 0px 0px 15px 0px;
  font-size: 40px;
  font-weight: 800;
`;

const Tittle = styled.div`
  margin: 15px 0px;
  font-size: 25px;
  font-weight: 800;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgCard = styled.div`
  border-radius: 10px;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  width: 1190px;
  > * {
    width: 100%;
  }
`;

const tittle = ['Camera Setting', 'Posture'];
const workout = ['준비', '스쿼트', '팔굽혀펴기', '버피', '런지'];
const article = [[camSet1, camSet2, camSet3, camSet4, camSet5, camSet6], [squat], [pushup], [burpee], [lunge]];

export default function TutorialPage() {
  const [nowIdx, setNowIdx] = useState(0);
  const [nowWorkout, setNowWorkout] = useState(0);

  const handler = (e, idx) => {
    setNowIdx(0);
    setNowWorkout(idx);
  };

  const handleNext = () => {
    setNowIdx(nowIdx + 1);
    if (article[nowWorkout].length - 1 <= nowIdx) setNowIdx(0);
  };

  const handlePrev = () => {
    setNowIdx(nowIdx - 1);
    if (0 >= nowIdx) setNowIdx(article[nowWorkout].length - 1);
  };

  return (
    <Box>
      <BigTittle>TUTORIAL</BigTittle>
      <div>
        {/* 버튼 */}
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          {workout.map((e, idx) =>
            nowWorkout === idx ? (
              <Button key={idx} onClick={() => handler(e, idx)} variant="contained">
                {e}
              </Button>
            ) : (
              <Button key={idx} onClick={() => handler(e, idx)}>
                {e}
              </Button>
            )
          )}
        </ButtonGroup>
      </div>
      {nowWorkout <= 0 ? <Tittle>{tittle[0]}</Tittle> : <Tittle>{tittle[1]}</Tittle>}
      <Buttons>
        <Button onClick={() => handlePrev()}>
          <ArrowBackIosNewIcon />
        </Button>
        <ImgCard>
          <img src={article[nowWorkout][nowIdx]} alt="" />
        </ImgCard>
        <Button onClick={() => handleNext()}>
          <ArrowForwardIosIcon />
        </Button>
      </Buttons>
    </Box>
  );
}
