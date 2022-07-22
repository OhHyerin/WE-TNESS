import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { testWorkout } from '../../features/room/roomSlice';

export default function RoomFilter1() {
  const workouts = useSelector(state => state.room.workouts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(testWorkout());
  }, []);

  return (
    <div>
      <h2>운동 종류</h2>
      <>{workouts}</>
    </div>
  );
}
