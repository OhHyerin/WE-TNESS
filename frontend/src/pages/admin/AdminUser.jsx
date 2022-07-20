import AdminNav from '../../components/admin/AdminNav';
import UserList from '../../components/admin/UserList';

export default function AdminUser() {
  return (
    <div>
      <AdminNav />
      <h1>관리자 페이지 - 유저</h1>
      <UserList />
    </div>
  );
}
