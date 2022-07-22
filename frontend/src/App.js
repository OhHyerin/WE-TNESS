import { Outlet } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <NavBar></NavBar>

      <Outlet></Outlet>
    </div>
  );
}

export default App;
