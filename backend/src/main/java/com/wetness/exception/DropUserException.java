package com.wetness.exception;

public class DropUserException extends RuntimeException {
    private static final long serialVersionUID = -2238030302650813813L;

    public DropUserException() {
        super("탈퇴한 회원입니다.");
    }
}
