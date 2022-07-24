package com.wetness.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InputUtil {

    // https://rap0d.github.io/study/2020/09/18/java_valid_password/
    public static boolean checkValidPassword(String password) {
        // 최소 8자, 최대 20자 상수 선언
        final int MIN = 8;
        final int MAX = 20;

        // 영어, 숫자, 특수문자 포함한 MIN to MAX 글자 정규식
        final String REGEX = "^((?=.*\\d)(?=.*[a-zA-Z])(?=.*[\\W]).{" + MIN + "," + MAX + "})$";
        // 공백 문자 정규식
        final String BLANKPT = "(\\s)";

        // 정규식 검사객체
        Matcher matcher;

        // 공백 체크
        if (password == null || "".equals(password)) {
            return false;
        }

        // ASCII 문자 비교를 위한 UpperCase
        String tmpPw = password.toUpperCase();
        // 문자열 길이
        int strLen = tmpPw.length();

        // 글자 길이 체크
        if (strLen > 20 || strLen < 8) {
            return false;
        }

        // 공백 체크
        matcher = Pattern.compile(BLANKPT).matcher(tmpPw);
        if (matcher.find()) {
            return false;
        }

        // 비밀번호 정규식 체크
        matcher = Pattern.compile(REGEX).matcher(tmpPw);
        if (!matcher.find()) {
            return false;
        }

        return true;
    }

    //TODO Nickname 규칙 논의 필요
    public static boolean checkValidNickname(String nickname) {
//        if (nickname.length() >= 2 && nickname.length() <= 8) {
//            return false;
//        }
        return true;
    }

    //https://www.delftstack.com/ko/howto/java/email-validation-method-in-java/
    public static boolean checkValidEmail(String email) {
        String regx = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
        Pattern pattern = Pattern.compile(regx);

        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

}
