package com.wetness.model.service;

import com.wetness.db.entity.CommonCode;
import com.wetness.db.repository.CommonCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommonCodeServiceImpl implements CommonCodeService {

    private final CommonCodeRepository commonCodeRepository;

    @Override
    @Transactional
    public String findCommonCodeName(String code) {
        CommonCode commonCode = commonCodeRepository.findByCode(code);
        return commonCode.getName();
    }
}