import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import stamp from '../../../assets/images/diary/stamp.png';

const Diary = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  > div {
    display: flex;
    flex-wrap: wrap;
  }

  > div > div {
    flex-grow: 1;
    flex-basis: 0;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  > div > div > div {
    padding: 16px;
    display: flex;
    height: inherit;
  }

  p {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: space-around;
  }

  span {
    display: flex;
    align-items: center;
  }
`;

export default function DiaryList() {
  const weeklyAttend = useSelector(state => state.history.weeklyCalories);
  const diary = ['', '월', '화', '수', '목', '금', '토', '일'];
  const cnt = weeklyAttend.filter(e => e.login === true).length;
  return (
    <div style={{ width: '50%' }}>
      <Card sx={{ maxWidth: 1, margin: 1 }}>
        <CardContent>
          <h2 style={{ textAlign: 'center' }}>내 운동 다이어리</h2>
        </CardContent>
      </Card>
      <Diary>
        {[...Array(2)].map((n, j) => (
          <div sx={{ width: 1 }}>
            {diary.map((day, i) => (
              <>
                {i >= j * 4 && i < (j + 1) * 4 ? (
                  <Card sx={{ margin: 1 }}>
                    <CardContent>
                      <Typography>
                        {i > 0 ? (
                          <>
                            <span>{day} </span>
                            {weeklyAttend[i - 1].login ? (
                              <img src={stamp} alt="stamp" />
                            ) : (
                              <img src={stamp} alt="stamp" style={{ visibility: 'hidden' }} />
                            )}
                          </>
                        ) : (
                          <span>총 {cnt} 일</span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                ) : null}
              </>
            ))}
          </div>
        ))}
      </Diary>
    </div>
  );
}
