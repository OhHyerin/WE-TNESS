package com.wetness.service;

import com.wetness.model.User;
import com.wetness.model.request.JoinUserDto;
import com.wetness.model.response.FindEmailResDto;

public interface UserService {

    boolean checkEmailDuplicate(String email);


    boolean checkNicknameDuplicate(String nickname);

     boolean registerUser(JoinUserDto joinUserDto);

     void updateUser(Long id, User user);

     FindEmailResDto findByEmail(String nickname);
    User findLoginUser(String email, String password);
}
