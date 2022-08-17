import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import AwardList from '../../components/history/Award/AwardList';
import MatchList from '../../components/history/Match/MatchList';
import RecordList from '../../components/history/Record/RecordList';
import DiaryList from '../../components/history/Diary/DiaryList';
import { fetchDiary, fetchHistory } from '../../features/user/HistorySlice';
import UserProfile from '../../components/myPage/UserProfile';

export default function HistoryPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const nickname = params.userNickname;

  useEffect(() => {
    dispatch(fetchHistory(nickname));
    dispatch(fetchDiary(nickname));
  }, [dispatch]);

  if (isAuthenticated) {
    return (
      <div>
        <UserProfile userNickname={nickname}></UserProfile>
        <AwardList></AwardList>
        <MatchList></MatchList>
        <RecordList></RecordList>
        <DiaryList></DiaryList>
      </div>
    );
  }
  return <Navigate to="/login" />;
}
