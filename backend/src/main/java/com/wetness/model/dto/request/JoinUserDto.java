package com.wetness.model.dto.request;

import com.wetness.util.InputUtil;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import static com.wetness.util.InputUtil.EMAIL_REGEX;
import static com.wetness.util.InputUtil.PASSWORD_REGEX;

@Data
public class JoinUserDto {


    //Essential Info
    @NotBlank  // @Size(min=?,max=?) 사이즈 제한 추가
    @Pattern(regexp = EMAIL_REGEX,message = "email 형식이 올바르지 않습니다")
    private String email;
    @NotBlank // @Size(min=?,max=?) 사이즈 제한 추가
    @Pattern(regexp= PASSWORD_REGEX, message = "password 형식이 올바르지 않습니다.")
    private String password;
//    private String pwdVerify; client-side에서 비밀번호 체크 참고 : https://stackoverflow.com/questions/42190530/matching-passwords-with-front-end-or-back-end
    private String nickname;

    //Extra Info
    private String addressCode;
    private String gender;
    private Double height;
    private Double weight;

}
