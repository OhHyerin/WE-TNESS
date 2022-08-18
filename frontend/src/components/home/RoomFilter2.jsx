import { useDispatch } from 'react-redux';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { testShowPrivate } from '../../features/room/RoomSlice';

export default function RoomFilter2() {
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(testShowPrivate());
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel control={<Switch />} onChange={handleChange} label="비밀방 보기" labelPlacement="start" />
      </FormGroup>
    </>
  );
}
