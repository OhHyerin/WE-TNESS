package com.wetness.service;

import com.wetness.model.User;
import com.wetness.model.request.JoinUserDto;
import com.wetness.model.response.FindEmailResDto;

public interface UserService {

    boolean checkEmailDuplicate(String email);


    boolean checkNicknameDuplicate(String nickname);

     boolean registerUser(JoinUserDto joinUserDto);

     void updateUser(Long id, User user);

     User findByNickname(String nickname);
     User findByEmail(String email);
    User findLoginUser(String email, String password);
}
