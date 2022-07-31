package com.wetness.dto.request;

import com.wetness.util.InputUtil;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class JoinUserDto {
    //Essential Info
    @NotBlank  // @Size(min=?,max=?) 사이즈 제한 추가
    @Pattern(regexp = InputUtil.EMAIL_REGEX,message = "email 형식이 올바르지 않습니다")
    private String email;
    @NotBlank // @Size(min=?,max=?) 사이즈 제한 추가
    @Pattern(regexp= InputUtil.PASSWORD_REGEX, message = "password 형식이 올바르지 않습니다.")
    private String password;
//    private String pwdVerify; client-side에서 비밀번호 체크 참고 : https://stackoverflow.com/questions/42190530/matching-passwords-with-front-end-or-back-end
    private String nickname;

    //Extra Info
    private String addressCode;
    private String gender;
    private Double height;
    private Double weight;

}
