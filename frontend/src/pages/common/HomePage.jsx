import { useNavigate } from 'react-router-dom';
import Banner from '../../components/home/Banner';
import RankingPreview from '../../components/home/RankingPreview';
import RoomList from '../../components/home/RoomList';
import RoomFilter1 from '../../components/home/RoomFilter1';
import RoomFilter2 from '../../components/home/RoomFilter2';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
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
