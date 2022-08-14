import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import awards from '../../../assets/data/awardItems';

const AwardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImgBox = styled.div`
  margin: 10px;
  width: 1/5;
`;

const ImgTag = styled.img`
  height: 150px;
  object-fit: contain;
`;

export default function AwardList() {
  const achieveAwards = useSelector(state => state.history.achieveAwards);
  let awardList = [];
  for (let i = 0; i < achieveAwards.length; i++) {
    awardList = [...awardList, achieveAwards[i].award];
  }
  return (
    <div>
      <h2>도전과제</h2>
      <AwardBox>
        {awards.map((award, idx) =>
          awardList.includes(award.eventName) ? (
            <AwardImg key={idx} awardImg={award.acheiveImg} description={award.description} />
          ) : (
            <AwardImg key={idx} awardImg={award.notAcheiveImg} />
          )
        )}
      </AwardBox>
    </div>
  );
}
function AwardImg({ awardImg, description }) {
  // const [isMoreInfo, setIsMoreInfo] = useState(false);
  return (
    // <div>
    //   <ImgBox
    //     onClick={() => {
    //       setIsMoreInfo(!isMoreInfo);
    //     }}>
    //     <ImgTag src={awardImg} alt="" />
    //   </ImgBox>
    //   {isMoreInfo ? <p>{description}</p> : null}
    // </div>
    <>
      {description ? (
        <ImgBox>
          <Tooltip title={description} followCursor>
            <ImgTag src={awardImg} alt="" />
          </Tooltip>
        </ImgBox>
      ) : (
        <ImgBox>
          <ImgTag src={awardImg} alt="" />
        </ImgBox>
      )}
    </>
  );
}
