import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { getAccessToken, getCurrentUser } from './features/Token';
import { fetchCurrentUser, checkLogin, toggleIsLoding } from './features/user/UserSlice';
import NavBar from './components/common/NavBar';
import GlobalStyle from './styles/GlobalStyle';
import Resolution from './styles/Resolution';
import theme from './styles/Theme';
import { setIsSearch, setKeyword } from './features/room/RoomSlice';
import SearchUser from '../src/components/search/SearchUser';
import SearchRoomList from '../src/components/search/SearchRoomList';
import RoomFilter1 from '../src/components/home/RoomFilter1';
import RoomFilter2 from '../src/components/home/RoomFilter2';

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
  }, [dispatch]);

  const isSearched = useSelector(state => state.room.isSearched);
  const location = useLocation();

  useEffect(() => {
    dispatch(setIsSearch(false));
    dispatch(setKeyword(''));
  }, [location]);

  if (isLoding) {
    return (
      <div>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <NavBar></NavBar>

          <Resolution>
            {isSearched ? (
              <div>
                <SearchUser />
                <RoomFilter1 />
                <RoomFilter2 />
                <SearchRoomList />
              </div>
            ) : (
              <Outlet id="outlet" />
            )}
          </Resolution>
        </ThemeProvider>
      </div>
    );
  }
  return null;
}

export default App;
