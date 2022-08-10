import Radio from '@mui/material/Radio';
import { RadioGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGender } from '../../../features/user/EditSlice';

export default function GenderForm() {
  const dispatch = useDispatch();
  const gender = useSelector(state => state.edit.userInfo.gender);

  function onGenderHandeler(e) {
    dispatch(fetchGender(e.target.value));
  }
  return (
    <div>
      <label>성별</label>
      <RadioGroup
        value={gender}
        onChange={onGenderHandeler}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
        }}>
        <FormControlLabel value="female" control={<Radio />} label="여성" />
        <FormControlLabel value="male" control={<Radio />} label="남성" />
      </RadioGroup>
    </div>
  );
}
