package com.wetness.model.service;

import com.wetness.db.repository.CommonCodeRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class CommonCodeServiceImplTest {

//    @Autowired
//    CommonCodeService commonCodeService;
//
//    @Test
//    @Transactional
//    public void findCommonCode() {
//        String val = commonCodeService.findCommonCodeName("1100000000");
//        Assertions.assertThat(val).isEqualTo("서울특별시");
//    }
}