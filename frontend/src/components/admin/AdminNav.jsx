import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
  display: flex;
  gap: 10px;
`;

export default function adminNav() {
  return (
    <Nav>
      <Link to="/admin/user">유저</Link>
      <Link to="/admin/room">방</Link>
      <Link to="/admin/report">신고</Link>
    </Nav>
  );
}
