import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Button } from '@mui/material';
import { workoutChange, testWorkout } from '../../features/room/RoomSlice';

export default function RoomFilter1() {
  const workouts = useSelector(state => state.room.workouts);
  const workout = useSelector(state => state.room.workout);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(testWorkout());
  }, []);

  const handleBtnChange = e => {
    console.log(e);
    dispatch(workoutChange(e));
  };

  return (
    <>
      <Stack spacing={2} direction="row">
        {workouts.map(nowWorkout => (
          <Button
            variant={nowWorkout === workout ? 'contained' : 'outlined'}
            onClick={() => {
              handleBtnChange(nowWorkout);
            }}>
            {nowWorkout}
          </Button>
        ))}
      </Stack>
      {workout}
    </>
  );
}
