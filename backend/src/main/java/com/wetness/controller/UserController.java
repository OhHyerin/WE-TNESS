package com.wetness.controller;

import com.wetness.jwt.JwtUtil;
import com.wetness.model.User;
import com.wetness.dto.request.JoinUserDto;
import com.wetness.dto.request.RefreshTokenDto;
import com.wetness.dto.response.*;
import com.wetness.service.MailService;
import com.wetness.service.UserDetailsImpl;
import com.wetness.service.UserService;
import com.wetness.util.InputUtil;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    @PostMapping("/join")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<BaseResponseEntity> registerUser(@Valid @RequestBody JoinUserDto joinUserDto) {
        System.out.println("회원가입시 원래 암호 : " + joinUserDto.getPassword());
        System.out.println("회원가입시 변경된 암호 : " + passwordEncoder.encode(joinUserDto.getPassword()));
        User user = new User(
                joinUserDto.getEmail(),
                passwordEncoder.encode(joinUserDto.getPassword()),
                joinUserDto.getNickname(),
                joinUserDto.getGender(),
                joinUserDto.getHeight(),
                joinUserDto.getWeight(),
                "wetness",
                "user"
        );

        String inputAddressCode = joinUserDto.getAddressCode();
        if (inputAddressCode != null && inputAddressCode.length() == 10) {
            user.setSidoCode(inputAddressCode.substring(0, 2) + "00000000");
            user.setGugunCode(inputAddressCode.substring(0, 5) + "00000");
        }

        userService.registerUser(user);

        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    //TODO sql error 처리 추가 필요
    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    public ResponseEntity<?> loginUser(@RequestBody User user) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String accessToken = jwtUtil.createAccessToken(authentication);
        String refreshToken = jwtUtil.createRefreshToken();
        userService.saveRefreshToken(userDetails.getNickname(), refreshToken);
        LoginDto loginDto = new LoginDto("200", null, accessToken, refreshToken);
        return ResponseEntity.ok().body(loginDto);
    }


    @GetMapping("/duplicate-email/{email}")
    @ApiOperation(value = "이메일 중복확인")
    public ResponseEntity<DuplicateCheckResDto> duplicatedEmail(@PathVariable@Valid@Pattern(regexp = InputUtil.EMAIL_REGEX ,message = "email 형식이 틀립니다") String email) {
        //true면 이미 존재, false면 사용가능
        return ResponseEntity.ok().body(new DuplicateCheckResDto(userService.checkEmailDuplicate(email)));
    }

    @GetMapping("/duplicate-nickname/{nickname}")
    @ApiOperation(value = "닉네임 중복확인")
    public ResponseEntity<DuplicateCheckResDto> duplicatedNickname(@PathVariable  String nickname) {

        //true면 이미 존재, false면 사용가능
        return ResponseEntity.ok().body(new DuplicateCheckResDto(userService.checkNicknameDuplicate(nickname)));
    }

    @PutMapping
    @ApiOperation(value = "회원정보 수정")
    public ResponseEntity<BaseResponseEntity> updateUser(@RequestBody User user) {
        System.out.println("회원정보 수정 id : " + user.getId());
        userService.updateUser(user.getId(), user);

        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

//    @PostMapping("/findEmail")
//    @ApiOperation(value = "이메일 찾기")
//    public ResponseEntity<FindEmailResDto> findId(@RequestParam("nickname") String nickname) {
//        System.out.println("sendPwd Nickname : " + nickname);
//
//        User user = userService.findByNickname(nickname);
//        FindEmailResDto resDto = new FindEmailResDto(user.getEmail());
//
//        return ResponseEntity.status(200).body(resDto);
//    }

    @GetMapping("/sendPw")
    @ApiOperation(value = "비밀번호 찾기를 위한 이메일 인증")
    public ResponseEntity<String> sendPwd(@RequestParam("email") String email) {
        System.out.println("sendPwd EMAIL : " + email);

        try {
            mailService.sendMail(email);
            return ResponseEntity.status(200).body(SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(300).body(FAIL);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDto refreshTokenDto) {

        String requestRefreshToken = refreshTokenDto.getRefreshToken();
        String nickname = refreshTokenDto.getNickname();
        User user = userService.findByNickname(nickname);

        if (jwtUtil.isUsable(requestRefreshToken)) {
            String savedRefreshToken = userService.getRefreshToken(nickname);
            if (requestRefreshToken.equals(savedRefreshToken)) {

                String accessToken = jwtUtil.createTokenForRefresh(user);
                LoginDto loginDto = new LoginDto("200", null, accessToken, requestRefreshToken);
                return ResponseEntity.ok().body(loginDto);
            }
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));


    }

    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴")
    public ResponseEntity<String> deleteUser(HttpServletRequest request) {
//    public ResponseEntity<String> deleteUser(HttpServletRequest request){
        String nickname = (String) request.getAttribute("nickname");
        userService.deleteUser(nickname);

        return ResponseEntity.ok().body(SUCCESS);
    }

//    @GetMapping("/login/{auth}")
//    @ApiOperation(value = "소셜 로그인")
//    public ResponseEntity<Map<String, Object>> loginSocial(@PathVariable("auth") String auth, @RequestParam(value = "code") String code) throws IOException {
//        // social 종류 : 카카오(2), 구글(3), 페이스북(4) 등
//        int social = 2;
//        // 리턴할 json
//        Map<String, Object> result = new HashMap<>();
//
//        switch (auth) {
//            case "kakao":
//                social = 2;
//                break;
//        }
//
//        String token = userService.getSocialToken(social, code);
//
//        // 토큰에 해당하는 회원정보 있다면 토큰 만들고 Response
//        User user = userService.getUserBySocialToken(2, token);
//        if (user != null) {
//            String accessToken = jwtUtil.createAccessToken(user);
//            result.put("exist_user", true);
//            result.put("accessToken", accessToken);
//            return ResponseEntity.ok().body(result);
//        }
//
//        // 토큰으로 유저정보 조회
//        Map<String, Object> userInfo = userService.getUserInfo(token);
//        user = new User();
//        // email, gender 정보 유무에 따라 유저 세팅, 추후 수정
//        if (userInfo.containsKey("email")) {
//            user.setEmail((String) userInfo.get("email"));
//        } else {
//            user.setEmail(RandomString.make(15));
//        }
//        if (userInfo.containsKey("gender")) {
//            user.setGender((String) userInfo.get("gender"));
//        } else {
//            user.setGender("3");
//        }
//
//        user.setSocial(auth);
//        user.setSocialToken(token);
//        user.setRole("user");
//        user.setNickname(RandomString.make(15));
//
//        userService.registerUserBySocial(user);
//        String accessToken = jwtUtil.createAccessToken(user);
//
//        result.put("existUser", false);
//        result.put("accessToken", accessToken);
//
//        return ResponseEntity.ok().body(result);
//    }

    @PostMapping("/login/create-account")
    public ResponseEntity<Map<String, Object>> createAccount(@RequestParam(value = "changeNickname") String changeNickname) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = (String) authentication.getPrincipal();

        // 이전에 발급한 토큰으로 닉네임 추출 - 새로 전달받은 닉네임으로 DB 수정 후 토큰 다시 발급
        User user = userService.findByEmail(email);
        user.setNickname(changeNickname);
        userService.updateUser(user.getId(), user);

        Map<String, Object> result = new HashMap<>();
        result.put("accessToken", jwtUtil.createAccessToken(authentication));

        return ResponseEntity.ok(result);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String nickname = (String) request.getAttribute("nickname");
        userService.logoutUser(nickname);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        String nickname = (String) request.getAttribute("nickname");
        User user = userService.findByNickname(nickname);
        if (user != null) {
            return ResponseEntity.ok().body(UserInfoDto.generateUserInfoDto(user));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }
}
