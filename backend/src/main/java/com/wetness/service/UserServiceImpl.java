package com.wetness.service;

import com.wetness.core.queryrepository.UserQueryRepository;
import com.wetness.model.User;
import com.wetness.model.request.JoinUserDto;
import com.wetness.core.repository.UserRepository;
import com.wetness.util.InputUtil;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserQueryRepository userQueryRepository;
    private final String hostKakao = "https://kauth.kakao.com/oauth/token";

    @Override
    @Transactional
    public boolean registerUser(JoinUserDto joinUserDto) {
        final String inputPassword = joinUserDto.getPassword();
        final String inputPwdVerify = joinUserDto.getPwdVerify();
        final String inputEmail = joinUserDto.getEmail();
        final String inputNickName = joinUserDto.getNickname();
        final String inputAddressCode = joinUserDto.getAddressCode();
        final String inputGender = joinUserDto.getGender();
        final Double inputHeight = joinUserDto.getHeight();
        final Double inputWeight = joinUserDto.getWeight();

        if (InputUtil.checkValidEmail(inputEmail) &&
                InputUtil.checkValidPassword(inputPassword) &&
                InputUtil.checkValidNickname(inputNickName) &&
                inputPassword.equals(inputPwdVerify) &&
                checkEmailDuplicate(inputEmail) &&
                checkNicknameDuplicate(inputNickName)) {
            User user = new User();

            //Essential Info
            user.setEmail(inputEmail);
            user.setPassword(inputPassword);
            user.setNickname(inputNickName);
            user.setSocial("0");
            user.setRole("normal");

            //Extra Info
            if (inputAddressCode != null && inputAddressCode.length() == 10) {
                String sidoCode = inputAddressCode.substring(0, 2) + "00000000";
                String gugunCode = inputAddressCode.substring(0, 5) + "00000";
                user.setSidoCode(sidoCode);
                user.setGugunCode(gugunCode);
            }
            if (inputGender != null &&
                    (inputGender.equals("male") || inputGender.equals("female"))) {
                user.setGender(inputGender);
            }
            if (inputHeight != null && inputHeight != 0.0) {
                user.setHeight(inputHeight);
            }
            if (inputWeight != null && inputWeight != 0.0) {
                user.setWeight(inputWeight);
            }

            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean registerUserBySocial(User user) {

        userRepository.save(user);
        return true;
    }

    @Override
    @Transactional
    public void updateUser(Long id, User reqDto) {
        User user = userRepository.getOne(id);
        System.out.println("여기여기 : "+user.getId());
        if (reqDto.getPassword() != null) {
            user.setPassword(reqDto.getPassword());
        }
        if (reqDto.getSidoCode() != null) {
            user.setSidoCode(reqDto.getSidoCode());
        }
        if (reqDto.getGugunCode() != null) {
            user.setGugunCode(reqDto.getGugunCode());
        }
        if (reqDto.getGender() != null) {
            user.setGender(reqDto.getGender());
        }
        if (reqDto.getHeight() != 0) {
            user.setHeight(reqDto.getHeight());
        }
        if (reqDto.getWeight() != 0) {
            user.setWeight(reqDto.getWeight());
        }

    }

    @Override
    @Transactional
    public User loginUser(String email, String password) {
        User findUser = userRepository.findByEmail(email);
        if (findUser != null && findUser.getPassword().equals(password)) {
            return findUser;
        }
        return null;
    }

    @Override
    @Transactional
    public void saveRefreshToken(String nickname, String refreshToken) {
        User findUser = userRepository.findByNickname(nickname);
        if (findUser != null) {
            findUser.setRefreshToken(refreshToken);
        }
    }

    @Override
    public String getRefreshToken(String nickname) {
        User user = userRepository.findByNickname(nickname);
        return user.getRefreshToken();
    }

    @Override
    @Transactional
    public void deleteUser(String nickname) {
        User user = userRepository.findByNickname(nickname);
        System.out.println("user.nickname : "+user.getNickname());
        if(user!=null){
            user.setRole("drop");
        }
    }

    @Override
    @Transactional
    public User findByNickname(String nickname) {
        User user = userRepository.findByNickname(nickname);
        return user;
    }

    @Override
    public User findByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    @Transactional
    public boolean checkEmailDuplicate(String email) {
        User user = userRepository.findByEmail(email);
        if(user==null){
            return true;
        }else{
            return false;
        }
    }

    @Override
    @Transactional
    public boolean checkNicknameDuplicate(String nickname) {
        User user = userRepository.findByNickname(nickname);
        if(user==null){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public User getUserBySocialToken(int social, String socialToken) {

        return userQueryRepository.findOneBySocial(social, socialToken);
    }

    @Override
    public String getSocialToken(int social, String code) throws IOException {
        URL url = new URL(hostKakao);
        switch (social) {
            case 2:
                url = new URL(hostKakao);
                break;
        }

        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        String token = "";
        try {
            urlConnection.setRequestMethod("POST");
            urlConnection.setDoOutput(true); // 데이터 기록 알려주기

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            // Client_id = REST_API_KEY 수정 필요
            sb.append("&client_id=cddf8fe3437329bf32a17342aa27ea7e");
            // 초기 프론트에서 설정한 Redirect_uri
            sb.append("&redirect_uri=http://localhost:8080/user/login/kakao");
            sb.append("&code=" + code);

            bw.write(sb.toString());
            bw.flush();

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("result = " + result);

            // json parsing
            JSONParser parser = new JSONParser();
            JSONObject elem = (JSONObject) parser.parse(result);

            String access_token = elem.get("access_token").toString();
            String refresh_token = elem.get("refresh_token").toString();
            System.out.println("refresh_token = " + refresh_token);
            System.out.println("access_token = " + access_token);

            token = access_token;

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return token;
    }

    public Map<String, Object> getUserInfo(String accessToken) throws IOException {
        String host = "https://kapi.kakao.com/v2/user/me";
        Map<String, Object> result = new HashMap<>();
        try {
            URL url = new URL(host);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("Authorization", "Bearer " + accessToken);
            urlConnection.setRequestMethod("GET");

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);


            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String res = "";
            while ((line = br.readLine()) != null) {
                res += line;
            }

            System.out.println("res = " + res);


            JSONParser parser = new JSONParser();
            JSONObject obj = (JSONObject) parser.parse(res);
            JSONObject kakaoAccount = (JSONObject) obj.get("kakao_account");


            String id = obj.get("id").toString();
            if (kakaoAccount.containsKey("email")) {
                result.put("email", kakaoAccount.get("email").toString());
            }
            if (kakaoAccount.containsKey("gender")) {
                result.put("gender", kakaoAccount.get("gender").toString());
            }


            br.close();


        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }

        return result;
    }

    @Override
    @Transactional
    public void logoutUser(String nickname) {
        User user = findByNickname(nickname);
        if (user != null) {
            user.setRefreshToken(null);
        }
    }




}
