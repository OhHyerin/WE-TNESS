package com.wetness.service;

import com.wetness.model.User;
import com.wetness.model.response.FindEmailResDto;

public interface UserService {

    boolean checkEmailDuplicate(String email);


    boolean checkNicknameDuplicate(String nickname);

     void registerUser(User user);

     void updateUser(Long id, User user);

     User findByNickname(String nickname);
     User findByEmail(String email);
    User findLoginUser(String email, String password);
}
