package com.wetness.model.dto.request;

import lombok.Data;

import java.util.ArrayList;

@Data
public class UsersNicknameReqDto {
    private ArrayList<String> users;
}
