package com.wetness.db.repository;

import com.wetness.db.entity.Medal;
import com.wetness.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;

public interface MedalRepository extends JpaRepository<Medal, Long> {
}
