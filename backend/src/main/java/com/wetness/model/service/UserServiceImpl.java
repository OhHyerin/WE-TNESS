package com.wetness.model.service;

import com.wetness.auth.jwt.JwtUtil;
import com.wetness.db.entity.LoggedContinue;
import com.wetness.db.entity.User;
import com.wetness.db.repository.CommonCodeRepository;
import com.wetness.db.repository.LoggedContinueRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.model.dto.request.JoinUserDto;
import com.wetness.model.dto.request.PasswordDto;
import com.wetness.model.dto.request.UpdateUserDto;
import com.wetness.model.dto.response.LoginDto;
import com.wetness.model.dto.response.UserInfoResDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final LoggedContinueRepository loggedContinueRepository;
    private final CommonCodeRepository commonCodeRepository;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    private final String hostKakao = "https://kauth.kakao.com/oauth/token";

    @Override
    @Transactional
    public boolean registerUser(JoinUserDto joinUserDto) {
        if (!checkEmailDuplicate(joinUserDto.getEmail()) &&
                !checkNicknameDuplicate(joinUserDto.getNickname())) {
            User user = new User(
                    joinUserDto.getEmail(),
                    passwordEncoder.encode(joinUserDto.getPassword()),
                    joinUserDto.getNickname(),
                    "wetness",
                    "user"
            );
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
    public boolean updateUser(Long id, UpdateUserDto updateUserDto) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            if (updateUserDto.getNickname() != null &&
                    !updateUserDto.getNickname().isEmpty() &&
                    !checkNicknameDuplicate(updateUserDto.getNickname())) {
                user.setNickname(updateUserDto.getNickname());
            }

            if (updateUserDto.getAddressCode() != null) {
                String inputAddressCode = updateUserDto.getAddressCode();
                if (inputAddressCode != null && inputAddressCode.length() == 10) {
                    user.setSidoCode(inputAddressCode.substring(0, 2) + "00000000");
                    user.setGugunCode(inputAddressCode.substring(0, 5) + "00000");
                }
            }
            if (updateUserDto.getGender() != null && !updateUserDto.getGender().isEmpty()) {
                user.setGender(updateUserDto.getGender());
            }
            if (updateUserDto.getHeight() != null && updateUserDto.getHeight() != 0.0) {
                user.setHeight(updateUserDto.getHeight());
            }
            if (updateUserDto.getWeight() != null && updateUserDto.getWeight() != 0.0) {
                user.setWeight(updateUserDto.getWeight());
            }
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public void updateUser(Long id, User reqDto) {
        User user = userRepository.getOne(id);
        System.out.println("여기여기 : " + user.getId());
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
        User findUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email + "의 이메일을 가진유저가 없습니다"));
        return findUser;
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
        if (user != null) {
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
        User findUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email + "의 이메일을 가진유저가 없습니다"));
        return findUser;
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public boolean checkEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    @Transactional
    public boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
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

    @Override
    @Transactional
    public void setLoginData(Long userId) {
        LocalDate today = LocalDate.now();
        LoggedContinue loggedContinue = loggedContinueRepository.findByUserId(userId);
        if (loggedContinue == null) {
            loggedContinue = new LoggedContinue(userId, 1, 1, today);
            loggedContinueRepository.save(loggedContinue);
        } else if (!today.isEqual(loggedContinue.getRecentDate())) {
            if (today.isEqual(loggedContinue.getRecentDate().plusDays(1))) {
                loggedContinue.setConsecutively(loggedContinue.getConsecutively() + 1);
                if (loggedContinue.getMaxConsecutively() < loggedContinue.getConsecutively()) {
                    loggedContinue.setMaxConsecutively(loggedContinue.getConsecutively());
                }
            } else { //하루전 로그인 기록 없을 경우 연속 출석일 1로 설정
                loggedContinue.setConsecutively(1);
            }
            loggedContinue.setRecentDate(today);
        }
    }


    @Override
    public LoggedContinue getLoginData(Long userId) {
        return loggedContinueRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public boolean updateUserPassword(long id, PasswordDto passwordDto) {
        User user = userRepository.getOne(id);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(passwordDto.getPassword()));
            return true;
        }
        return false;
    }

    //TODO security Role 체크하여 drop인 유저는 제외 로직 추가 필요
    @Override
    @Transactional
    public LoginDto loginUser(User user) {
        Authentication authentication = getAuthentication(user);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String accessToken = jwtUtil.createAccessToken(authentication);
        String refreshToken = jwtUtil.createRefreshToken();

        saveRefreshToken(userDetails.getNickname(), refreshToken);
        setLoginData(userDetails.getId());

        return new LoginDto("200", null, accessToken, refreshToken);
    }


    @Override
    public Authentication getAuthentication(User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }

    @Override
    public LoginDto getCurrentUserLoginDto(String headerAuth, String nickname) {
        String accessToken = null;
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            accessToken = headerAuth.substring(7, headerAuth.length());
        }
        String refreshToken = getRefreshToken(nickname);
        return new LoginDto("200", null, accessToken, refreshToken);
    }

    @Override
    @Transactional
    public ArrayList<UserInfoResDto> getUsersInfoResDto(ArrayList<String> users) {
        ArrayList<UserInfoResDto> list = new ArrayList<UserInfoResDto>();
        for (String userNickname : users) {
            User user = userRepository.findByNickname(userNickname);
            String address = getAddress(user.getSidoCode(), user.getGugunCode());
            UserInfoResDto userInfoResDto = UserInfoResDto.generateUserInfoResDto(user, address);
            list.add(userInfoResDto);
        }
        return list;
    }

    @Override
    @Transactional
    public UserInfoResDto getUserInfoResDto(String nickname) {
        User user = findByNickname(nickname);
        if (user != null) {
            String address = getAddress(user.getSidoCode(), user.getGugunCode());
            return UserInfoResDto.generateUserInfoResDto(user, address);
        }
        return null;
    }

    @Override
    @Transactional
    public String getAddress(String sidoCode, String gugunCode) {
        if (sidoCode != null && gugunCode != null) {
            String sido = commonCodeRepository.findByCode(sidoCode).getName();
            String gugun = commonCodeRepository.findByCode(gugunCode).getName();
            return sido + " " + gugun;
        }
        return null;
    }

}
