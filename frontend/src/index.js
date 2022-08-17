import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import store from './store';
import HomePage from './pages/common/HomePage';
import RoomPage from './pages/common/RoomPage';
import RankPage from './pages/common/RankPage';
import SignupPage from './pages/accounts/SignupPage';
import LoginPage from './pages/accounts/LoginPage';
import KakaoLoginPage from './pages/accounts/KakaoLoginPage';
import HistoryPage from './pages/accounts/HistoryPage';
import MyPage from './pages/accounts/MyPage';
import EditPage from './pages/accounts/EditPage';
import NotFoundPage from './pages/common/NotFoundPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<HomePage />}></Route>
          <Route path="signup" element={<SignupPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="login/kakao" element={<KakaoLoginPage />}></Route>
          <Route path="history/:userNickname" element={<HistoryPage />}></Route>
          <Route path="room" element={<RoomPage />}></Route>
          <Route path="ranking" element={<RankPage />}></Route>
          <Route path="edit" element={<EditPage />}></Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
