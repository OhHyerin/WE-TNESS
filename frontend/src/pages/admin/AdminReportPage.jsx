import AdminNav from '../../components/admin/AdminNav';
import ReportList from '../../components/admin/ReportList';

export default function AdminReport() {
  return (
    <div>
      <AdminNav />
      <h1>관리자 페이지 - 신고</h1>
      <ReportList />
    </div>
  );
}
