import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Banner from '../../components/home/Banner';
import RankingPreview from '../../components/home/RankingPreview';
import RoomList from '../../components/home/RoomList';
import RoomFilter1 from '../../components/home/RoomFilter1';
import RoomFilter2 from '../../components/home/RoomFilter2';
import { toggleIsModal } from '../../features/user/UserSlice';

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

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isModal = useSelector(state => state.user.isModal)

  function handleClose () {
    dispatch(toggleIsModal())
  }

  return (
    <div>
      <div>
        <Modal
          open={isModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <p>하이요</p>
          </Box>
        </Modal>
        <Banner />
        <RankingPreview />
        <>
          {/* 운동 목록 */}
          <RoomFilter1 />
        </>
        <>
          {/* 비밀방 여부 */}
          <RoomFilter2 />
        </>
        <RoomList />
        <button
          onClick={() => {
            navigate('room/3');
          }}>
          방 입장
        </button>
      </div>
    </div>
  );
}
