package com.wetness.model.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BaseResponseEntity {
    private int status;
    private String code;
    private String message;

    public BaseResponseEntity(int status, String message){
        this.status = status;
        this.message = message;
    }
}
