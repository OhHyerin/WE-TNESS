package backend.model.request;

import backend.model.User;
import lombok.Data;

@Data
public class JoinUserDto {
    private String email;
    private String password;
    private String pwdVerify;
    private String nickname;
    private String social;
    private String role;

    public User generateUser() {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setNickname(nickname);
        user.setSocial(social);
        user.setRole(role);
        return user;
    }
}
