//package com.wetness.model.response;
//
//import javax.persistence.*;
//
//@Entity
//@Table(name = "role")
//public enum Role {
//
//    ROLE_USER("user"),
//    ROLE_ADMIN("admin");
//
//    @Id @GeneratedValue
//    private Long id;
//    private String name;
//
//    Role(String name) {
//        this.name = name;
//    }
//
//    Role() {
//
//    }
//
//    public String getAuthority(){
//
//        return valueOf(this.name);
//
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    @Id
//    public Long getId() {
//        return id;
//    }
//}
