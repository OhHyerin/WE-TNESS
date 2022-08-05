import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { getAccessToken, getCurrentUser } from './features/Token';
import { fetchCurrentUser, checkLogin, toggleIsLoding } from './features/user/UserSlice';
import NavBar from './components/common/NavBar';
import GlobalStyle from './styles/GlobalStyle';
import Resolution from './styles/Resolution';
import theme from './styles/Theme';

function App() {
  const dispatch = useDispatch();

  const isLoding = useSelector(state => state.user.isLoding);
  const token = getAccessToken();

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser(getCurrentUser()));
      dispatch(checkLogin());
    }
    dispatch(toggleIsLoding());
  }, []);

  if (isLoding) {
    return (
      <div>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <NavBar></NavBar>

          <Resolution>
            <div>
              <Outlet></Outlet>
            </div>
          </Resolution>
        </ThemeProvider>
      </div>
    );
  }
  return null;
}

export default App;
