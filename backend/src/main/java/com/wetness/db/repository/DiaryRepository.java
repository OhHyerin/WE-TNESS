package com.wetness.db.repository;

import com.wetness.db.entity.Diary;
import com.wetness.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary,Long> {

    List<Diary> findByFileName(String filename);
    List<Diary> findByUser(User user);
}
