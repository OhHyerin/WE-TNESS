package com.wetness.model.service;

import com.wetness.db.entity.LoggedContinue;
import com.wetness.db.entity.User;
import com.wetness.model.dto.request.JoinUserDto;
import com.wetness.model.dto.request.PasswordDto;
import com.wetness.model.dto.request.UpdateUserDto;
import com.wetness.model.dto.response.LoginDto;
import com.wetness.model.dto.response.LoginSocialDto;
import org.springframework.security.core.Authentication;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

public interface UserService {

    boolean checkEmailDuplicate(String email);

    boolean checkNicknameDuplicate(String nickname);

    boolean registerUser(JoinUserDto user);

    LoginSocialDto registerSocialUser(Map<String,Object> data);

    boolean registerUserBySocial(User user);

    boolean updateUser(Long id, UpdateUserDto updateUserDto);

    void updateUser(Long id, User user);

    boolean updateUserPassword(long id, PasswordDto passwordDto);

    User findByNickname(String nickname);

    User findByEmail(String email);

    User findById(Long id);


    void saveRefreshToken(String nickname, String refreshToken);

    String getRefreshToken(String nickname);

    String getSocialAccessToken(int social, String code) throws IOException;

    Map<String, Object> getUserInfo(String accessToken) throws IOException;

    void logoutUser(String nickname);

    void deleteUser(String nickname);

    void setLoginData(Long userId);

    LoggedContinue getLoginData(Long userId);

    LoginDto loginUser(User user);

    LoginSocialDto loginSocialUser(User user);

    Authentication getAuthentication(User user);

    LoginDto getCurrentUserLoginDto(String headerAuth, String nickname);

    Optional<User> socialLogin(Map<String, Object> data);
}
