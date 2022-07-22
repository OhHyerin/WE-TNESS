import AdminNav from '../../components/admin/AdminNav';
import RoomList from '../../components/admin/RoomList';

export default function AdminRoom() {
  return (
    <div>
      <AdminNav />
      <h1>관리자 페이지 - 방</h1>
      <RoomList />
    </div>
  );
}
