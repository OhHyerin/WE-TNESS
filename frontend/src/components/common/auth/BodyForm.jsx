import { useDispatch, useSelector } from "react-redux";
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputBox from "./InputBox";
import { fetchWeight, fetchHeight } from "../../../features/user/SignupSlice";

export default function BodyFrom() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.signup.userInfo);

  function onWeightHandeler (e) {
    dispatch(fetchWeight(e.target.value))
  }
  function onHeightHandler (e) {
    dispatch(fetchHeight(e.target.value))
  }
  return (
    <InputBox>
    <label>키</label>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
          <Input
            value={userInfo.height}
            onChange={onHeightHandler}
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
          />
          <FormHelperText>Height</FormHelperText>
        </FormControl>
      <label>몸무게</label>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
          <Input
            value={userInfo.weight}
            onChange={onWeightHandeler}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          />
          <FormHelperText>Weight</FormHelperText>
        </FormControl>
    </InputBox>
  )
}