package backend.model;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Data
public class User {

    @Id @GeneratedValue
    private Long id;
    private String email;
    private String password;
    private String nickname;

    private String siCode;
    private String gunCode;

    private String gender;
    private double height;
    private double weight;
    private String social;
    private String role;
    private String socialToken;
    private boolean banState;
    private Date banDate;

}
