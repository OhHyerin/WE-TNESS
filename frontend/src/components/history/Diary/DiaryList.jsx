import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';

export default function DiaryList() {
  const diaryPhotos = useSelector(state => state.history.diaryPhotos);

  return (
    <>
      <h1>다이어리 리스트</h1>
      {diaryPhotos.map((photo, i) => (
        <Tooltip title={photo.regDate} followCursor>
          <img src={`https://a205.s3.us-west-1.amazonaws.com/${photo.filename}`} />
        </Tooltip>
      ))}
    </>
  );
}
