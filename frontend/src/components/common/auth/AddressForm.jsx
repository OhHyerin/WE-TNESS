import styled from "styled-components";
import React,{useState} from "react";
import DaumPostcode from "react-daum-postcode";
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { fetchAddressCode } from "../../../features/user/SignupSlice";

const LabelBox = styled.div`
  display: flex;
  justify-content: end;
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddressForm() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // state 추가
  const [zipCode, setZipcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");

  const completeHandler = data =>{
    console.log(data);
    setZipcode(data.zonecode);
    setRoadAddress(data.roadAddress);
    dispatch(fetchAddressCode(data.bcode))
    handleClose()
  }

  return(
  <div>
    <LabelBox>
      <Button onClick={handleOpen}>우편번호 찾기</  Button>
    </LabelBox>
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <DaumPostcode onComplete={completeHandler}/>
      </Box>
    </Modal>
    <p>우편번호 : {zipCode} </p>
    <p>주소 : {roadAddress}</p>
  </div>
  );
}