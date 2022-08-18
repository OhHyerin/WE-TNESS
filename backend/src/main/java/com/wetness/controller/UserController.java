package com.wetness.controller;

import com.wetness.auth.jwt.JwtUtil;
import com.wetness.db.entity.LoggedContinue;
import com.wetness.db.entity.User;
import com.wetness.model.dto.request.*;
import com.wetness.model.dto.response.*;
import com.wetness.model.service.CommonCodeService;
import com.wetness.model.service.MailService;
import com.wetness.model.service.UserDetailsImpl;
import com.wetness.model.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

import static com.wetness.util.InputUtil.EMAIL_REGEX;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final MailService mailService;


    @PostMapping("/join")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<BaseResponseEntity> registerUser(@Valid @RequestBody JoinUserDto joinUserDto) {

        if (userService.registerUser(joinUserDto)) {
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.loginUser(user));
    }

    @GetMapping("/duplicate-email/{email}")
    @ApiOperation(value = "이메일 중복확인")
    public ResponseEntity<DuplicateCheckResDto> duplicatedEmail(@PathVariable @Valid @Pattern(regexp = EMAIL_REGEX, message = "email 형식이 틀립니다") String email) {
        return ResponseEntity.ok().body(new DuplicateCheckResDto(userService.checkEmailDuplicate(email)));
    }

    @GetMapping("/duplicate-nickname/{nickname}")
    @ApiOperation(value = "닉네임 중복확인")
    public ResponseEntity<DuplicateCheckResDto> duplicatedNickname(@PathVariable String nickname) {
        return ResponseEntity.ok().body(new DuplicateCheckResDto(userService.checkNicknameDuplicate(nickname)));
    }

    @GetMapping("/login/duplicate-nickname/{nickname}")
    @ApiOperation(value = "닉네임 중복확인")
    public ResponseEntity<DuplicateCheckResDto> duplicatedLoginNickname(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                        @PathVariable String nickname) {
        if (userDetails.getNickname().equals(nickname)) {
            return ResponseEntity.ok().body(new DuplicateCheckResDto(false));
        }
        return ResponseEntity.ok().body(new DuplicateCheckResDto(userService.checkNicknameDuplicate(nickname)));
    }

    @PutMapping
    @ApiOperation(value = "회원정보 수정")
    public ResponseEntity<?> updateUser(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                        @RequestBody UpdateUserDto updateUserDto) {
        if (userService.updateUser(userDetails.getId(), updateUserDto)) {
            User user = userService.findById(userDetails.getId());
            String accessToken = jwtUtil.createTokenForRefresh(user);
            String refreshToken = jwtUtil.createRefreshToken();
            return ResponseEntity.ok().body(new LoginDto("200", null, accessToken, refreshToken));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @PutMapping("/pw")
    @ApiOperation(value = "비밀번호 수정")
    public ResponseEntity<BaseResponseEntity> updateUserPassword(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                 @Valid @RequestBody PasswordDto passwordDto) {
        if (userService.updateUserPassword(userDetails.getId(), passwordDto)) {
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @PostMapping("/send-pw")
    @ApiOperation(value = "비밀번호 찾기를 위한 이메일 인증")
    public ResponseEntity<?> sendPwd(@RequestParam("email") @Valid @Pattern(regexp = EMAIL_REGEX, message = "이메일 형식이 올바르지 않습니다") String email) {
        try {
            mailService.sendMail(email);
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
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
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (userService.deleteUser(userDetails.getNickname())) {
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @PostMapping("/login/kakao")
    @ApiOperation(value = "소셜 로그인")
    public ResponseEntity<?> loginSocial(@RequestParam String code) throws IOException {

        System.out.println(code);
        String token = userService.getSocialAccessToken(code);
        // 토큰에 해당하는 회원정보 있다면 토큰 만들고 Response
        Map<String, Object> data = userService.getUserInfo(token);
        Optional<User> userOpt = userService.socialLogin(data);
        // 유저가 db에 있다면
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // access-token 및 refresh 토큰 발급하고 응답
            return ResponseEntity.ok().body(userService.loginSocialUser(user));
        } else {
            // 만약 유저가 db에 없다면
            // 발급받은 사용자 정보 기반으로 유저 저장하고 임시 access 토큰 및 refresh 발급
            return ResponseEntity.ok().body(userService.registerSocialUser(data));
        }


    }

    @PostMapping("/login/create-account")
    public ResponseEntity<?> createAccount(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestParam String changeNickname) {

        // 이전에 발급한 토큰으로 닉네임 추출 - 새로 전달받은 닉네임으로 DB 수정 후 토큰 다시 발급

        return ResponseEntity.ok(userService.setSocialAccount(userDetails, changeNickname));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        userService.logoutUser(userDetails.getNickname());
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        UserInfoResDto userInfoResDto = userService.getUserInfoResDto(userDetails.getNickname());
        if (userInfoResDto != null) {
            return ResponseEntity.ok().body(userInfoResDto);
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @GetMapping("/login/continue")
    public ResponseEntity<?> getLoginContinue(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        LoggedContinue loggedContinue = userService.getLoginData(userDetails.getId());
        if (loggedContinue != null) {
            return ResponseEntity.ok().body(LoginContinueDto.generateLoginContinueDto(loggedContinue));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @PostMapping("/info")
    public ResponseEntity<?> getUsersInfo(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                          @RequestBody UsersNicknameReqDto usersNicknameReqDto) {
        ArrayList<UserInfoResDto> list = userService.getUsersInfoResDto(usersNicknameReqDto.getUsers());
        if (!list.isEmpty()) {
            return ResponseEntity.ok().body(new UsersInfoResDto(list));
        }

        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }

    @GetMapping("/login/log")
    public ResponseEntity<?> getLoginLog(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        ArrayList<LoginLogResDto> loginLog = userService.getLoginLog(userDetails.getId());
        return ResponseEntity.ok().body(loginLog);
    }

    @GetMapping("/login/date-log")
    public ResponseEntity<?> getDateLoginLog(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        ArrayList<String> loginDateLog = userService.getLoginDateLog(userDetails.getId());
        return ResponseEntity.ok().body(loginDateLog);
    }

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(@RequestParam String keyword) {
        ArrayList<UserInfoResDto> list = userService.searchUserWithKeyword(keyword);
        return ResponseEntity.ok().body(new UsersInfoResDto(list));
    }
}
