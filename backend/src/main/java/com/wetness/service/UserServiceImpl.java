package com.wetness.service;

import com.wetness.model.User;
import com.wetness.model.request.JoinUserDto;
import com.wetness.model.response.BaseResponseEntity;
import com.wetness.model.response.FindEmailResDto;
import com.wetness.repository.UserRepository;
import com.wetness.util.InputUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public boolean registerUser(JoinUserDto joinUserDto) {
        final String inputPassword = joinUserDto.getPassword();
        final String inputPwdVerify = joinUserDto.getPwdVerify();
        final String inputEmail = joinUserDto.getEmail();
        final String inputNickName = joinUserDto.getNickname();
        final String inputAddressCode = joinUserDto.getAddressCode();
        final String inputGender = joinUserDto.getGender();
        final Double inputHeight = joinUserDto.getHeight();
        final Double inputWeight = joinUserDto.getWeight();

        if (InputUtil.checkValidEmail(inputEmail) &&
                InputUtil.checkValidPassword(inputPassword) &&
                InputUtil.checkValidNickname(inputNickName) &&
                inputPassword.equals(inputPwdVerify) &&
                checkEmailDuplicate(inputEmail) &&
                checkNicknameDuplicate(inputNickName)) {
            User user = new User();

            //Essential Info
            user.setEmail(inputEmail);
            user.setPassword(inputPassword);
            user.setNickname(inputNickName);
            user.setSocial("0");
            user.setRole("normal");

            //Extra Info
            if (inputAddressCode != null && inputAddressCode.length() == 10) {
                String sidoCode = inputAddressCode.substring(0, 2) + "00000000";
                String gugunCode = inputAddressCode.substring(0, 5) + "00000";
                user.setSidoCode(sidoCode);
                user.setGugunCode(gugunCode);
            }
            if (inputGender != null &&
                    (inputGender.equals("male") || inputGender.equals("female"))) {
                user.setGender(inputGender);
            }
            if (inputHeight != null && inputHeight != 0.0) {
                user.setHeight(inputHeight);
            }
            if (inputWeight != null && inputWeight != 0.0) {
                user.setWeight(inputWeight);
            }

            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public void updateUser(Long id, User reqDto) {
        User user = userRepository.findOne(id);
        if (reqDto.getPassword() != null) {
            user.setPassword(reqDto.getPassword());
        }
        if (reqDto.getSidoCode() != null) {
            user.setSidoCode(reqDto.getSidoCode());
        }
        if (reqDto.getGugunCode() != null) {
            user.setGugunCode(reqDto.getGugunCode());
        }
        if (reqDto.getGender() != null) {
            user.setGender(reqDto.getGender());
        }
        if (reqDto.getHeight() != 0) {
            user.setHeight(reqDto.getHeight());
        }
        if (reqDto.getWeight() != 0) {
            user.setWeight(reqDto.getWeight());
        }

    }

    @Override
    public User findLoginUser(String email, String password) {
        User findUser = userRepository.findByEmail(email);
        if (findUser != null && findUser.getPassword().equals(password)) {
            return findUser;
        }
        return null;
    }

    @Override
    @Transactional
    public FindEmailResDto findByEmail(String nickname) {
        User user = userRepository.findByNickname(nickname);
        return new FindEmailResDto(user.getEmail());
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
