import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import stamp from '../../../assets/images/diary/stamp.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RecordBox = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
`;

const HeatmapBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin: 8px 8px;
  width: 100%;
  padding: 0px 15px;
`;

const BarBox = styled.div`
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin: 8px 8px;
  width: 100%;
  padding: 0px 15px;
`;

const Tile = styled.div`
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin: 8px 8px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 30px;
`;

const Placer = styled.div`
  > * {
    width: 50%;
    min-width: 400px;
    height: 260px;
  }
`;

// 출석
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

function getDate(e) {
  const date = new Date();
  const stDate = new Date(date.getFullYear(), date.getMonth() - 3, date.getDate());
  const edDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (e === 'start') return stDate;
  return edDate;
}

const RecordTitle = styled.p`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  padding: 20px 0px;
`;

export default function RecordList() {
  const todayCalorie = useSelector(state => state.history.todayCalorie);
  const heatMapList = useSelector(state => state.history.heatMapList);

  function onHover(e, v) {
    console.log(e, v);
  }

  // 출석
  const weeklyAttend = useSelector(state => state.history.weeklyCalories);
  const diary = ['', '월', '화', '수', '목', '금', '토', '일'];
  const cnt = weeklyAttend.filter(e => e.login === true).length;

  return (
    <>
      <RecordTitle>운동 기록</RecordTitle>
      <RecordBox>
        {/* 칼로리 */}
        <Placer>
          <Tile>
            <div>오늘의 칼로리 소모량</div>
            <div>{todayCalorie} kcal</div>
          </Tile>
        </Placer>

        {/* 출석 */}
        <Placer>
          <div>
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
        </Placer>
        {/* 잔디 */}
        <Placer>
          <HeatmapBox>
            <CalendarHeatmap
              startDate={getDate('start')}
              endDate={getDate('end')}
              values={heatMapList}
              showWeekdayLabels={true}
              onMouseOver={onHover}
            />
          </HeatmapBox>
        </Placer>
        {/* 막대차트 */}
        <Placer>
          <BarBox>
            <BarChart></BarChart>
          </BarBox>
        </Placer>
      </RecordBox>
    </>
  );
}

function BarChart() {
  const weeklyCalories = useSelector(state => state.history.weeklyCalories);

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '이번 주 운동량',
      },
    },
  };

  const labels = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const data = {
    labels,
    datasets: [
      {
        label: '칼로리 소모량',
        data: weeklyCalories.map(day => day.calorie),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
