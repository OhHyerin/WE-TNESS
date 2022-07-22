package com.wetness.service;

import com.wetness.model.User;
import com.wetness.model.response.FindEmailResDto;

public interface UserService {

    boolean checkEmailDuplicate(String email);


    boolean checkNicknameDuplicate(String nickname);

     void registerUser(User user);

     void updateUser(Long id, User user);

     FindEmailResDto findByEmail(String nickname);
    User findLoginUser(String email, String password);
}
