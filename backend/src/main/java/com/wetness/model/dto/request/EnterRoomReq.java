package com.wetness.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class EnterRoomReq {

    @NotBlank
    private String sessionName;
    private String password;

}
