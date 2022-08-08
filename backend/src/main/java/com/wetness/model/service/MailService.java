package com.wetness.model.service;

import com.wetness.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailService {
    /* SMTP : 간이 전자 우편 전송 프로토콜 */

    private final char[] pwdTable = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'};

    private final JavaMailSender javaMailSender;
    private final PasswordEncoder passwordEncoder;

    @Value("${spring.mail.username}")
    private String from;

    private final UserService userService;

    public String excuteGenerate() {
        Random random = new Random(System.currentTimeMillis());
        int tablelength = pwdTable.length;
        StringBuffer buf = new StringBuffer();

        for (int i = 0; i < 8; i++) {
            buf.append(pwdTable[random.nextInt(tablelength)]);
        }

        return buf.toString();
    }

    @Transactional
    public void sendMail(String emailAddr) throws Exception {

        SimpleMailMessage simpleMessage = new SimpleMailMessage();
        User tempUser = userService.findByEmail(emailAddr);

        //발신자 설정
//        simpleMessage.setFrom("WE-tness관리자 <ohyeah0506@gmail.com>");
        simpleMessage.setFrom(from);

        //수신자 설정
        simpleMessage.setTo(emailAddr);

        String tempPwd = excuteGenerate();
        String encodedPwd = passwordEncoder.encode(tempPwd);

        tempUser.setPassword(encodedPwd);
//        userService.updateUser(tempUser.getId(), tempUser);

        //메일 제목
        simpleMessage.setSubject("WE-tness에서 임시 비밀번호를 발급해드립니다.");
        //메일 내용
        simpleMessage.setText("임시 비밀번호는 " + tempPwd + " 입니다. \n 로그인 후 반드시 비밀번호를 변경해주세요.");
        //메일 발송
        javaMailSender.send(simpleMessage);
    }
}
