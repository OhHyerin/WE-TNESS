import { useSelector, useDispatch } from 'react-redux';
import { Stack, Button } from '@mui/material';
import { workoutChange } from '../../features/room/RoomSlice';
import workoutItems from '../../assets/data/workoutItems';

export default function RoomFilter1() {
  const workouts = workoutItems;
  const workout = useSelector(state => state.room.workout);
  const dispatch = useDispatch();

  const handleBtnChange = e => {
    dispatch(workoutChange(e));
  };

  return (
    <>
      <Stack spacing={1} direction="row">
        {workouts.map(nowWorkout => (
          <Button
            sx={{ width: '130px', height: '45px' }}
            key={nowWorkout.id}
            size="large"
            variant={nowWorkout.name === workout ? 'contained' : 'outlined'}
            onClick={() => {
              handleBtnChange(nowWorkout.id);
            }}>
            {nowWorkout.name}
          </Button>
        ))}
      </Stack>
    </>
  );
}
