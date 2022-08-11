package com.wetness.db.repository;

import com.wetness.db.entity.CommonCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommonCodeRepository extends JpaRepository<CommonCode, String> {
    CommonCode findByCode(String code);
}