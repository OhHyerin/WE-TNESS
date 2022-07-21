package backend.repository;

import backend.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Date;


@RunWith(SpringRunner.class)
@SpringBootTest
public class JpaUserRepositoryTest {

    @Autowired
    JpaUserRepository jpaUserRepository;

    @Test
    @Transactional
    @Rollback(value = false)
    public void testUserSave() {
        User user = new User();
        user.setEmail("test@gmail.com");
        user.setPassword("1111");
        user.setNickname("테스트A");
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

}