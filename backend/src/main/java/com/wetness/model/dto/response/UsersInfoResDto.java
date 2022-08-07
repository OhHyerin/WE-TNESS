package com.wetness.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;

@Data
@AllArgsConstructor
public class UsersInfoResDto {
    ArrayList<UserInfoResDto> users;
}
