package com.wetness.service;

import com.wetness.model.User;

import java.io.IOException;
import java.util.Map;

public interface UserService {

    boolean checkEmailDuplicate(String email);


    boolean checkNicknameDuplicate(String nickname);

    void registerUser(User user);

    boolean registerUserBySocial(User user);

    void updateUser(Long id, User user);

    User findByNickname(String nickname);

    User findByEmail(String email);

    User loginUser(String nickname, String password);

    void saveRefreshToken(String nickname, String refreshToken);

    String getRefreshToken(String nickname);


    String getSocialToken(int social, String code) throws IOException;

    Map<String, Object> getUserInfo(String accessToken) throws IOException;

    void logoutUser(String nickname);

    void deleteUser(String nickname);

}
