import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

import { testWorkout } from '../../features/room/roomSlice';

export default function RoomFilter1(value) {
  const workouts = useSelector(state => state.room.workouts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(testWorkout());
  }, []);

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">운동 종류</FormLabel>
      <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="전체" name="radio-buttons-group">
        {workouts.map(workout => (
          <FormControlLabel value={workout} control={<Radio />} label={workout} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
