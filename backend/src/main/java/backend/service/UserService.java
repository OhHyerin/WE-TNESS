package backend.service;

import backend.model.User;

public interface UserService {

    boolean checkEmailDuplicate(String email);


    boolean checkNicknameDuplicate(String nickname);

     void registerUser(User user);
}
