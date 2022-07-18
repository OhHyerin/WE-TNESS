import {
  Outlet,
} from "react-router-dom"
import NavBar from "../../components/common/NavBar"

export default function Home () {
  return (
    <div>
      <NavBar>
      </NavBar>

      <Outlet></Outlet>
  </div>
  )
}