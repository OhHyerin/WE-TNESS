import { useSelector, useDispatch } from 'react-redux';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { testShowPrivate } from '../../features/room/RoomSlice';

export default function RoomFilter2() {
  const showPrivate = useSelector(state => state.room.showPrivate);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(testShowPrivate());
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<Switch defaultChecked />}
          onChange={handleChange}
          label="비밀방 보기"
          labelPlacement="start"
        />
      </FormGroup>
      {showPrivate ? <div>내가 사라져볼게</div> : <div>얍</div>}
    </>
  );
}
