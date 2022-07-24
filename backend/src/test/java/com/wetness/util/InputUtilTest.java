package com.wetness.util;

import org.assertj.core.api.Assertions;
import org.junit.Test;

import static org.junit.jupiter.api.Assertions.*;

public class InputUtilTest {

    @Test
    public void checkValidPassword() {
        String[] array = new String[]{"1234AB!!"};
        for (String s : array) {
            Assertions.assertThat(InputUtil.checkValidPassword(s)).isTrue();
        }
    }

    @Test
    public void checkValidEmail() {
        String[] array = new String[]{"test@gmail.com", "test2@naver.co.kr"};
        for (String s : array) {
            Assertions.assertThat(InputUtil.checkValidEmail(s)).isTrue();
        }
    }
}