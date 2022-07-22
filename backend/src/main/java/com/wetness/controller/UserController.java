package com.wetness.controller;

import com.wetness.jwt.JwtUtil;
import com.wetness.model.User;
import com.wetness.model.request.JoinUserDto;
import com.wetness.model.response.BaseResponseEntity;
import com.wetness.model.response.DuplicateCheckResDto;
import com.wetness.model.response.FindEmailResDto;
import com.wetness.service.MailService;
import com.wetness.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private final UserService userService;
    @Autowired
    private final JwtUtil jwtUtil;

    @Autowired
    MailService mailService;


    @PostMapping("/join")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<BaseResponseEntity> registerUser(@RequestBody JoinUserDto joinUserDto) {
        if (userService.registerUser(joinUserDto)) {
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.internalServerError().body(new BaseResponseEntity(500, "Fail"));
    }

    //TODO sql error 처리 추가 필요
    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    public ResponseEntity<BaseResponseEntity> loginUser(@RequestBody User user) {
        User loginUser = userService.findLoginUser(user.getEmail(), user.getPassword());
        if (loginUser != null) {
            String token = jwtUtil.createToken(loginUser);
            return ResponseEntity.ok().body(new BaseResponseEntity(200, token));
        }
        return ResponseEntity.badRequest().body(new BaseResponseEntity(400, "Fail"));
    }


    @GetMapping("/duplicatedEmail/{email}")
    @ApiOperation(value = "이메일 중복확인")
    public ResponseEntity<DuplicateCheckResDto> duplicatedEmail(@PathVariable String email) {
        boolean possible = userService.checkEmailDuplicate(email);

        //true면 사용가능, false면 이미 존재
        return ResponseEntity.ok().body(new DuplicateCheckResDto(possible));
    }

    @GetMapping("/duplicatedNickname/{nickname}")
    @ApiOperation(value = "닉네임 중복확인")
    public ResponseEntity<DuplicateCheckResDto> duplicatedNickname(@PathVariable String nickname) {
        boolean possible = userService.checkNicknameDuplicate(nickname);

        //true면 사용 가능, false면 이미 존재
        return ResponseEntity.ok().body(new DuplicateCheckResDto(possible));
    }

    @PutMapping
    @ApiOperation(value = "회원정보 수정")
    public ResponseEntity<BaseResponseEntity> updateUser(@RequestBody User user) {
        userService.updateUser(user.getId(), user);

        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping("/findEmail")
    @ApiOperation(value="이메일 찾기")
    public ResponseEntity<FindEmailResDto> findId(@RequestParam("nickname") String nickname){
        System.out.println("sendPwd Nickname : "+nickname);

        User user = userService.findByNickname(nickname);
        FindEmailResDto resDto = new FindEmailResDto(user.getEmail());

        return ResponseEntity.status(200).body(resDto);
    }

    @GetMapping("/sendPw")
    @ApiOperation(value="비밀번호 찾기를 위한 이메일 인증")
    public ResponseEntity<String> sendPwd(@RequestParam("email") String email){
        System.out.println("sendPwd EMAIL : " + email);

        try{
            mailService.sendMail(email);
            return ResponseEntity.status(200).body(SUCCESS);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(300).body(FAIL);
        }


    }

}
