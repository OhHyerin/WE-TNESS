package com.wetness.db.entity;


public enum Workout {

    PushUp(1),
    SitUp(2),
    Burpee(3),
    Squirt(4)
    ;


    private int workoutId;

    Workout(int workoutId){
        this.workoutId = workoutId;
    }


}
