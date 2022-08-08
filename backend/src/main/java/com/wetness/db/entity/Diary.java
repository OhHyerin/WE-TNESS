package com.wetness.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="workout_diary")
public class Diary {
    @Id @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Column(name="file_name")
    private String fileName;

    @Column(name="reg_date") //column 변경
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name="game_record_id")
    private GameRecord gameRecord;

    @Column(name="is_valid")
    private boolean isValid;

    public void setValid(Boolean isValid){
        this.isValid = isValid;
    }

    private Diary(DiaryBuilder builder){
        this.id = builder.id;
        this.user = builder.user;
        this.fileName = builder.fileName;
        this.date = builder.date;
        this.gameRecord = builder.gameRecord;
        this.isValid = builder.isValid;
    }

    public static class DiaryBuilder{
        private long id;
        private User user;
        private String fileName;
        private LocalDateTime date;
        private GameRecord gameRecord;
        private Boolean isValid;

        public DiaryBuilder(){}

        public DiaryBuilder buildUser(User user){
            this.user = user;
            return this;
        }
        public DiaryBuilder buildFileName(String file){
            this.fileName = file;
            return this;
        }
        public DiaryBuilder buildDate(int[] date){
            this.date = LocalDateTime.of(date[0],date[1],date[2],date[3],date[4],date[5]);
            return this;
        }
        public DiaryBuilder buildRecord(GameRecord record){
            this.gameRecord = record;
            return this;
        }

        public DiaryBuilder buildValidation(Boolean isValid){
            this.isValid = isValid;
            return this;
        }
        public Diary getDiary(){
            return new Diary(this);
        }
    }


}
