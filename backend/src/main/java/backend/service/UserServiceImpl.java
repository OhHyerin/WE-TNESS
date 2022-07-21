package backend.service;

import backend.model.User;
import backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void registerUser(User user) {
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateUser(Long id, User reqDto) {
        User user = userRepository.findOne(id);
        if(reqDto.getPassword()!=null){
            user.setPassword(reqDto.getPassword());
        }
        if(reqDto.getSidoCode()!=null){
            user.setSidoCode(reqDto.getSidoCode());
        }
        if(reqDto.getGugunCode()!=null){
            user.setGugunCode(reqDto.getGugunCode());
        }
        if(reqDto.getGender()!=null){
            user.setGender(reqDto.getGender());
        }
        if(reqDto.getHeight()!=0){
            user.setHeight(reqDto.getHeight());
        }
        if(reqDto.getWeight()!=0){
            user.setWeight(reqDto.getWeight());
        }

    }

    @Override
    @Transactional
    public boolean checkEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    @Transactional
    public boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }
}
