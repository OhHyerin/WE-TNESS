package com.wetness.controller;

import com.wetness.jwt.JwtUtil;
import com.wetness.model.User;
import com.wetness.model.request.JoinUserDto;
import com.wetness.model.response.BaseResponseEntity;
import com.wetness.model.response.DuplicateCheckResDto;
import com.wetness.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @Autowired
    private final JwtUtil jwtUtil;

    @PostMapping("/join")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<BaseResponseEntity> registerUser(@RequestBody JoinUserDto joinUserDto) {
        if (joinUserDto.getPassword().equals(joinUserDto.getPwdVerify()) &&
                userService.checkEmailDuplicate(joinUserDto.getEmail()) &&
                userService.checkNicknameDuplicate(joinUserDto.getNickname())) {
            userService.registerUser(joinUserDto.generateUser());
            return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
        }
        return ResponseEntity.internalServerError().body(new BaseResponseEntity(500, "Fail"));
    }


    @GetMapping("/emailcheck/{email}")
    @ApiOperation(value = "이메일 중복확인")
    public ResponseEntity<DuplicateCheckResDto> duplicatedEmail(@PathVariable String email) {
        boolean possible = userService.checkEmailDuplicate(email);

        //true면 사용가능, false면 이미 존재
        return ResponseEntity.ok().body(new DuplicateCheckResDto(possible));
    }

    @GetMapping("/nicknamecheck/{nickname}")
    @ApiOperation(value = "닉네임 중복확인")
    public ResponseEntity<DuplicateCheckResDto> duplicatedNickname(@PathVariable String nickname) {
        boolean possible = userService.checkNicknameDuplicate(nickname);

        //true면 사용 가능, false면 이미 존재
        return ResponseEntity.ok().body(new DuplicateCheckResDto(possible));
    }

    @PutMapping
    @ApiOperation(value="회원정보 수정")
    public ResponseEntity<BaseResponseEntity> updateUser(@RequestBody User user){
        userService.updateUser(user.getId(), user);

        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping("/login/{auth}")
    @ApiOperation(value = "소셜 로그인")
    public ResponseEntity<Map<String,Object>> loginSocial(@PathVariable("auth") String auth, @RequestParam(value = "code") String code) throws IOException {
        // social 종류 : 카카오(2), 구글(3), 페이스북(4) 등
        int social =2;
        // 리턴할 json
        Map<String,Object> result = new HashMap<>();

        switch(auth) {
            case "kakao":
                social = 2;
                break;
        }

        String token = userService.getSocialToken(social,code);

        // 토큰에 해당하는 회원정보 있다면 토큰 만들고 Response
        User user = userService.getUserBySocialToken(2,token);
        if (user!=null){
            String jwt = jwtUtil.createToken(user);
            result.put("exist_user", true);
            result.put("JWT", jwt);
            return ResponseEntity.ok().body(result);
        }

        Map<String, Object> userInfo = userService.getUserInfo(token);
        user = new User();
        user.setEmail((String) userInfo.get("email"));
        user.setGender("gender");
        user.setSocial(Integer.toString(social));
        user.setSocialToken(token);
        byte[] array = new byte[10];
        user.setNickname(new String(array, Charset.forName("UTF-8")));

        userService.registerUser(user);

        result.put("exist_user",false);
        result.put("original_nickname", user.getNickname());

        return ResponseEntity.ok().body(result);
    }


}
