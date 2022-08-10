package com.wetness.model.dto.response;

import com.wetness.db.entity.LoggedContinue;
import lombok.Data;

@Data
public class LoginContinueDto {

    private int consecutively;
    private int maxConsecutively;

    public static LoginContinueDto generateLoginContinueDto(LoggedContinue loggedContinue) {
        LoginContinueDto loginContinueDto = new LoginContinueDto();
        loginContinueDto.setConsecutively(loggedContinue.getConsecutively());
        loginContinueDto.setMaxConsecutively(loggedContinue.getMaxConsecutively());
        return loginContinueDto;
    }
}