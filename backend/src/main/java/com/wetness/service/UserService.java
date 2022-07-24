package com.wetness.service;

import com.wetness.model.User;
import com.wetness.model.request.JoinUserDto;

public interface UserService {

    boolean checkEmailDuplicate(String email);


    boolean checkNicknameDuplicate(String nickname);

    boolean registerUser(JoinUserDto joinUserDto);

    void updateUser(Long id, User user);

    User findByNickname(String nickname);

    User findByEmail(String email);

    User loginUser(String nickname, String password);

    void saveRefreshToken(String nickname, String refreshToken);

    String getRefreshToken(String nickname);
}
