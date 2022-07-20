import { useSelector } from 'react-redux';
import LoginPleasePage from './LoginPleasePage';
import BadgeList from '../../components/userHistory/Badge/BadgeList';
import RecordList from '../../components/userHistory/Match/RecordList';
import DiaryList from '../../components/userHistory/Diary/DiaryList';
import Historys from '../../components/userHistory/History/Historys';

export default function UserHistory() {
  const isLogin = useSelector(state => state.user.isLogin);
  if (isLogin) {
    return (
      <div>
        <h1>운동 현황 페이지</h1>
        <BadgeList />
        <RecordList />
        <Historys />
        <DiaryList />
      </div>
    );
  }
  return <LoginPleasePage></LoginPleasePage>;
}
