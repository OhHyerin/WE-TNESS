package com.wetness.service;

import com.sun.xml.internal.ws.api.ha.StickyFeature;
import com.wetness.model.User;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Map;

public interface UserService {

    boolean checkEmailDuplicate(String email);


    boolean checkNicknameDuplicate(String nickname);

     void registerUser(User user);

     void updateUser(Long id, User user);

    User getUserBySocialToken(int social,String socialToken);

    String getSocialToken(int social, String code) throws IOException;

    Map<String, Object> getUserInfo(String accessToken) throws IOException;
}
