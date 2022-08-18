import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import styled from 'styled-components';

const DiaryTitle = styled.p`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  padding: 40px 0px;
`;

const NoDiaryBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  font-size: large;
`;

export default function DiaryList() {
  const diaryPhotos = useSelector(state => state.history.diaryPhotos);

  if (diaryPhotos.length) {
    return (
      <>
        <DiaryTitle>다이어리 리스트</DiaryTitle>
        {diaryPhotos.map((photo, i) => (
          <Tooltip title={photo.regDate} followCursor>
            <img src={`https://a205.s3.us-west-1.amazonaws.com/${photo.filename}`} />
          </Tooltip>
        ))}
      </>
    );
  }
  return (
    <>
      <DiaryTitle>다이어리 리스트</DiaryTitle>
      <NoDiaryBox>준비중입니다!</NoDiaryBox>
    </>
  );
}
