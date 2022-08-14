import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Modal } from '@mui/material';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';
import { fetchFollowerList, fetchFollowingList } from '../../features/user/UserSlice';
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';

const FollowBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  width: 50%;
  justify-content: space-evenly;
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderActiveShape = props => {
  console.log('active');
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}회`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function UserProfile(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowerList());
    dispatch(fetchFollowingList());
  }, []);

  const followerList = useSelector(state => state.user.followerList);
  const followingList = useSelector(state => state.user.followingList);

  const [openFollower, setOpenFollower] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

  // 팔로워 핸들러
  const handleOpenFollower = () => {
    setOpenFollower(true);
    console.log(followerList);
  };
  const handleCloseFollower = () => setOpenFollower(false);

  // 팔로잉 핸들러
  const handleOpenFollowing = () => {
    setOpenFollowing(true);
    console.log(followingList);
  };
  const handleCloseFollowing = () => setOpenFollowing(false);

  // chart
  const [charState, setCharState] = useState({
    activeIndex: 0,
  });

  const onPieEnter = (_, index) => {
    setCharState({
      activeIndex: index,
    });
  };

  const matches = useSelector(state => state.history.matches);

  const data = [
    { name: '1등', value: matches.gold },
    { name: '2등', value: matches.silver },
    { name: '3등', value: matches.bronze },
    { name: '순위권 외', value: matches.totalCnt - (matches.gold + matches.silver + matches.bronze) },
  ];

  return (
    <>
      <div>유저 네임 : {props.userNickname}</div>
      <div>
        <Button onClick={handleOpenFollower}>팔로워 :{followerList.length}</Button>
        <Button onClick={handleOpenFollowing}>팔로잉 :{followingList.length}</Button>
      </div>
      <div>
        <span>총 경기 수 : {matches.totalCnt} </span>
        <span>1등 : {matches.gold} </span>
        <span>2등 : {matches.silver} </span>
        <span>3등 : {matches.bronze} </span>
      </div>
      <div>
        {/* 원형 그래프 */}
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={charState.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* 모달 - 팔로워, 팔로잉 */}
      <Modal open={openFollower} onClose={handleCloseFollower}>
        <FollowBox>
          <FollowerList followerList={followerList} />
        </FollowBox>
      </Modal>
      <Modal open={openFollowing} onClose={handleCloseFollowing}>
        <FollowBox>
          <FollowingList followingList={followingList} />
        </FollowBox>
      </Modal>
    </>
  );
}
