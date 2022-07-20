import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
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
