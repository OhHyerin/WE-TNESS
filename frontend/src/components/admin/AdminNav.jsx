import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
  display: flex;
  gap: 10px;
`;

export default function adminNav() {
  return (
    <Nav>
      <Link to="/adminuser">유저</Link>
      <Link to="/adminroom">방</Link>
      <Link to="/adminreport">신고</Link>
    </Nav>
  );
}
