package com.wetness.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DuplicateCheckResDto {

    boolean isExist;
}
