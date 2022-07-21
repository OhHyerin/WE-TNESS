package backend.repository;

import backend.model.User;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Date;


@RunWith(SpringRunner.class)
//@Slf4j
@SpringBootTest
public class JpaUserRepositoryTest {

    @Autowired
    JpaUserRepository jpaUserRepository;

    Logger log = (Logger) LoggerFactory.getLogger(JpaUserRepositoryTest.class);

    @Test
    @Transactional
    @Rollback(value = false)
    public void testUserSave() {
        User user = new User();
        user.setEmail("test1@gmail.com");
        user.setPassword("1111");
        user.setNickname("테스트A2");
        user.setSiCode("aaa");
        user.setGunCode("bbb");
        user.setGender("male");
        user.setHeight(120);
        user.setWeight(120);
        user.setSocial("test");
        user.setRole("test");
        user.setSocialToken("test");
        user.setBanState(true);
        user.setBanDate(new Date());

        jpaUserRepository.save(user);
    }

    @Test
    @Transactional
    @Rollback(value = false)
    public void testUserUpdate() {
      User user = jpaUserRepository.findOne(1L);
      user.setBanDate(new Date());
    }

    @Test
    @Transactional
    @Rollback(value = false)
    public void testUserDuplicatedEmail(){
        boolean possible = jpaUserRepository.existsByEmail("test23456@gmail.com");
        log.info("Email Duplicated possible - " + possible);
    }

    @Test
    @Transactional
    @Rollback(value = false)
    public void testUserDuplicatedNickname(){
        boolean possible = jpaUserRepository.existsByNickname("테스트A3");
        log.info("Nickname Duplicated possible - " + possible);
    }

}