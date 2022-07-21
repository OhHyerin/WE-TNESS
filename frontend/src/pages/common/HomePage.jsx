import { useNavigate } from 'react-router-dom';
import Banner from '../../components/home/Banner';
import RankingPreview from '../../components/home/RankingPreview';
import RoomList from '../../components/home/RoomList';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Banner />
        <RankingPreview />
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
