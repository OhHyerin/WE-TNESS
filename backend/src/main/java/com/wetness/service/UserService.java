package com.wetness.service;

import com.wetness.model.User;
import com.wetness.model.request.JoinUserDto;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Map;

public interface UserService {

    boolean checkEmailDuplicate(String email);


    boolean checkNicknameDuplicate(String nickname);

    boolean registerUser(JoinUserDto joinUserDto);

    boolean registerUserBySocial(User user);

    void updateUser(Long id, User user);

    User findByNickname(String nickname);

    User findByEmail(String email);

    User loginUser(String nickname, String password);

    void saveRefreshToken(String nickname, String refreshToken);

    String getRefreshToken(String nickname);

    User getUserBySocialToken(int social,String socialToken);

    String getSocialToken(int social, String code) throws IOException;

    Map<String, Object> getUserInfo(String accessToken) throws IOException;

    void logoutUser(String nickname);
}
