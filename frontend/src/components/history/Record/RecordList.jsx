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

export default function RecordList() {
  const todayCalories = useSelector(state => state.history.todayCalories);

  function onHover(e, v) {
    console.log(e, v);
  }
  return (
    <RecordBox>
      <h2>운동 기록</h2>
      <h3>오늘의 칼로리 소모량</h3>
      <p>{todayCalories}</p>
      <HeatmapBox>
        <CalendarHeatmap
          startDate={new Date('2016-01-01')}
          endDate={new Date('2016-04-01')}
          values={[
            { date: '2016-01-01', count: 12 },
            { date: '2016-01-22', count: 122 },
            { date: '2016-01-30', count: 38 },
            // ...and so on
          ]}
          showWeekdayLabels={true}
          onMouseOver={onHover}
        />
      </HeatmapBox>
      <BarBox>
        <BarChart></BarChart>
      </BarBox>
    </RecordBox>
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
        data: labels.map(() => 100),
        // data: weeklyCalories.map((day) => day.value)
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
