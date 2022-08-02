import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styled from 'styled-components';

const HeatmapBox = styled.div`
  width: 50%;
`;

export default function HistoryList() {
  function onHover(e, v) {
    console.log(e, v);
  }
  return (
    <div>
      <h2>운동 기록</h2>
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
    </div>
  );
}
