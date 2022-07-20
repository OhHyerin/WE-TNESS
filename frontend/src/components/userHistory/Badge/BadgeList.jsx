import { useSelector } from 'react-redux';

export default function BadgeList() {
  const userNickname = useSelector(state => state.user.nickname);

  return (
    <div>
      <h2>도전과제</h2>
      {userNickname}의 도전과제
    </div>
  );
}
