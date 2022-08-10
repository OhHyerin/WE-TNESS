package com.wetness.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InputUtil {

    public static final String EMAIL_REGEX = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
    public static final String PASSWORD_REGEX = "^((?=.*\\d)(?=.*[a-zA-Z])(?=.*[\\W]).{8,20})$";

    //https://www.delftstack.com/ko/howto/java/email-validation-method-in-java/
    public static boolean checkValidEmail(String email) {
        String regx = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
        Pattern pattern = Pattern.compile(regx);

        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

}
