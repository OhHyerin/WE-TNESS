import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import awards from '../../../assets/data/awardItems';

const AwardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`;

const ImgBox = styled.div`
  grid-row: 1/5;
  width: 150px;
  height: 150px;
`;

const ImgTag = styled.img`
  width: 300px;
  height: 150px;
  object-fit: contain;
`;

export default function AwardList() {
  const achieveAwards = useSelector(state => state.history.achieveAwards);
  return (
    <div>
      <h2>도전과제</h2>
      <AwardBox>
        {awards.map((award, idx) =>
          achieveAwards.includes(award.id) ? (
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
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  return (
    <div>
      <ImgBox
        onClick={() => {
          setIsMoreInfo(!isMoreInfo);
        }}>
        <ImgTag src={awardImg} alt="" />
      </ImgBox>
      {isMoreInfo ? <p>{description}</p> : null}
    </div>
  );
}
