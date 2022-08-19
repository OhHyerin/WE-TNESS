import { Tooltip, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import awards from '../../../assets/data/awardItems';
import blank from '../../../assets/images/award/blank.png';

const AwardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ImgBox = styled.div`
  margin: 10px;
  width: 1/5;
`;

const ImgTag = styled.img`
  height: 150px;
  object-fit: contain;
`;

const AwardTitle = styled.p`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  padding: 20px 0px;
`;

export default function AwardList() {
  const achieveAwards = useSelector(state => state.history.achieveAwards);
  let awardList = [];
  for (let i = 0; i < achieveAwards.length; i++) {
    awardList = [...awardList, achieveAwards[i].award];
  }

  let myAwards = [];
  let temp = [];
  for (let i = 0; i < awards.length; i++) {
    if (awardList.includes(awards[i].eventName)) {
      temp.push({ img: awards[i].acheiveImg, description: awards[i].description });
    } else {
      temp.push({ img: awards[i].notAcheiveImg });
    }

    if (temp.length >= 6) {
      myAwards = [...myAwards, temp];
      temp = [];
    }

    if (awards.length - 1 === i) {
      const num = awards.length % 6;
      for (let i = 0; i < 6 - num; i++) {
        temp = [...temp, { img: blank }];
      }
      myAwards = [...myAwards, temp];
      temp = [];
    }
  }

  return (
    <div>
      <AwardTitle>도전과제</AwardTitle>
      <Carousel
        autoplay={true}
        autoplayInterval={'4000'}
        wrapAround={true}
        renderCenterLeftControls={({ previousSlide }) => (
          <Button>
            <ArrowBackIosIcon fontSize="large" onClick={previousSlide}></ArrowBackIosIcon>
          </Button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <Button>
            <ArrowForwardIosIcon fontSize="large" onClick={nextSlide}></ArrowForwardIosIcon>
          </Button>
        )}
        defaultControlsConfig={{
          pagingDotsStyle: {
            padding: '0px 3px',
          },
        }}>
        {myAwards.map((arr, j) => (
          <AwardBox key={j}>
            {arr.map((award, idx) => (
              <AwardImg key={idx} awardImg={award.img} description={award.description} />
            ))}
          </AwardBox>
        ))}
      </Carousel>
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
