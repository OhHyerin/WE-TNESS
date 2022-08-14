import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RecordBox = styled.div`
  display: flex;
  gap: 10px;
`;

const HeatmapBox = styled.div`
  width: 30%;
`;

const BarBox = styled.div`
  width: 30%;
`;

const Tile = styled.div`
  > * {
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    margin: 0px 5px;
  }
  display: flex;
`;

function getDate(e) {
  const date = new Date();
  const stDate = new Date(date.getFullYear(), date.getMonth() - 3, date.getDate());
  const edDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (e === 'start') return stDate;
  return edDate;
}

export default function RecordList() {
  const todayCalorie = useSelector(state => state.history.todayCalorie);
  const heatMapList = useSelector(state => state.history.heatMapList);

  function onHover(e, v) {
    console.log(e, v);
  }
  return (
    <>
      <h2>운동 기록</h2>
      <RecordBox>
        <Tile>
          <h3>오늘의 칼로리 소모량</h3>
        </Tile>
        <Tile>
          <p>{todayCalorie} kcal</p>
        </Tile>
        <HeatmapBox>
          <CalendarHeatmap
            startDate={getDate('start')}
            endDate={getDate('end')}
            values={heatMapList}
            showWeekdayLabels={true}
            onMouseOver={onHover}
          />
        </HeatmapBox>
        <BarBox>
          <BarChart></BarChart>
        </BarBox>
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
