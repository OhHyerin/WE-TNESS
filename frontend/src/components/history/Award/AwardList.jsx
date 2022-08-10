import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import awards from '../../../assets/data/awardItems';

const AwardBox = styled.div`
  display: flex;
  gap: 30px;
`;

const ImgBox = styled.div`
  width: 150px;
  height: 150px;
`;

export default function AwardList() {
  const achieveAwards = useSelector(state => state.history.achieveAwards);
  return (
    <div>
      <h2>도전과제</h2>
      <AwardBox>
        {awards.map((award, idx) =>
          achieveAwards.includes(award.id) ? (
            <AwardImg key={idx} award={award} isAchieve={true} />
          ) : (
            <AwardImg key={idx} award={award} isAchieve={false} />
          )
        )}
      </AwardBox>
    </div>
  );
}
function AwardImg({ award, isAchieve }) {
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  return (
    <div>
      <ImgBox
        onClick={() => {
          setIsMoreInfo(!isMoreInfo);
        }}>
        {isAchieve ? (
          <img src={award.img} alt="" />
        ) : (
          <img src={award.img} style={{ filter: 'grayscale(200%)' }} alt="" />
        )}
      </ImgBox>
      {isMoreInfo ? <p>{award.description}</p> : null}
    </div>
  );
}
