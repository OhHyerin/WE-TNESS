import {
  Link,
} from "react-router-dom"
import styled from "styled-components"

const Nav = styled.div`
  display: flex;
  gap: 10px;
`

export default function NavBar (props) {
  return (
    <Nav>
      <Link to="/">Home</Link>
    </Nav>
  )
}