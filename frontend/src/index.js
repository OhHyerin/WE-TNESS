import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/common/Home';
import Signup from './pages/accounts/Signup';
import Login from './pages/accounts/Login';
import Room from './pages/common/Room';
import UserHistory from './pages/accounts/UserHistory';
import store from './store';
import Ranking from './pages/common/Ranking';
import MyPage from './pages/accounts/MyPage';
import Edit from './pages/accounts/Edit';
import AdminUser from './pages/admin/AdminUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home></Home>}></Route>
          <Route path="signup" element={<Signup></Signup>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="history/:userNickname" element={<UserHistory></UserHistory>}></Route>
          <Route path="room/:roomId" element={<Room />}></Route>
          <Route path="ranking" element={<Ranking />}></Route>
          <Route path="mypage/:userNickname" element={<MyPage />}></Route>
          <Route path="edit" element={<Edit />}></Route>
          <Route path="adminuser" element={<AdminUser />}></Route>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
