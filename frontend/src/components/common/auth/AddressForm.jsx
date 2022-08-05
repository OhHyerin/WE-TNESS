import styled from 'styled-components';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DaumPostcode from 'react-daum-postcode';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { fetchAddress, fetchAddressCode } from '../../../features/user/EditSlice';

const LabelBox = styled.div`
  display: flex;
  justify-content: end;
`;

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // state 추가
  const address = useSelector(state => state.edit.userInfo.address);

  const completeHandler = data => {
    console.log(data);
    dispatch(fetchAddress(data.roadAddress));
    dispatch(fetchAddressCode(data.bcode));
    handleClose();
  };

  return (
    <div>
      <LabelBox>
        <Button onClick={handleOpen}>주소 찾기</Button>
      </LabelBox>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <DaumPostcode onComplete={completeHandler} />
        </Box>
      </Modal>
      <p>주소 : {address}</p>
    </div>
  );
}
