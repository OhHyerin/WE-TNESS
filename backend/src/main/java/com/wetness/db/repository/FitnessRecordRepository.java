package com.wetness.db.repository;

import com.wetness.db.entity.FitnessRecord;
import com.wetness.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FitnessRecordRepository extends JpaRepository<FitnessRecord,Long> {

    Optional<FitnessRecord> findByUserAndRegDate(User user, LocalDate regDate);

    List<FitnessRecord> findByUser(User user);

    List<FitnessRecord> findByUserAndRegDateGreaterThan(User user, LocalDate regDate);
}
