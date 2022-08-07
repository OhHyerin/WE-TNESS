package com.wetness.model.service;

import com.wetness.db.entity.Workout;
import com.wetness.db.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("workoutService")
public class WorkoutServiceImpl implements WorkoutService{

    @Autowired
    WorkoutRepository workRepo;

    @Override
    public Workout getWorkoutInfo(long id) {
        return workRepo.findById(id).get();
    }
}
