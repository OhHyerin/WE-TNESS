package com.wetness.service;

import com.wetness.model.User;

public interface UserService {

    boolean checkEmailDuplicate(String email);


    boolean checkNicknameDuplicate(String nickname);

     void registerUser(User user);

     void updateUser(Long id, User user);

    User findLoginUser(String email, String password);
}
