import useEffect from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import AwardList from '../../components/history/Award/AwardList';
import RecordList from '../../components/history/Match/RecordList'
import HistoryList from '../../components/history/History/HistoryList';
import DiaryList from '../../components/history/Diary/DiaryList'
import { petchHistory } from '../../features/user/userSlice';


export default function HistoryPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const nickname = params.userNickname

  // useEffect(() => {
  //   // dispatch(petchHistory())
  // });

  if (isAuthenticated) {
    return (
      <div>
        <h1>{nickname}님의 운동 현황 페이지</h1>
        <AwardList></AwardList>
        <RecordList></RecordList>
        <HistoryList></HistoryList>
        <DiaryList></DiaryList>
      </div>
    );
  }
  return <Navigate to='/login'/>;
}
