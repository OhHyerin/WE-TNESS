import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getAccessToken, getCurrentUser } from './features/Token';
import { fetchCurrentUser, checkLogin, toggleIsLoding } from './features/user/UserSlice';
import NavBar from './components/common/NavBar';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  const dispatch = useDispatch();

  const isLoding = useSelector(state => state.user.isLoding);
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      dispatch(fetchCurrentUser(getCurrentUser()));
      dispatch(checkLogin());
    }
    dispatch(toggleIsLoding());
  }, []);
  if (isLoding) {
    return (
      <div className="App">
        <GlobalStyle />
        <NavBar></NavBar>

        <Outlet></Outlet>
      </div>
    );
  }
  return null;
}

export default App;
