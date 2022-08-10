package com.wetness.exception;

public class NoJwtTokenException extends RuntimeException {
    private static final long serialVersionUID = -2238030302650813813L;

    public NoJwtTokenException() {
        super("토큰이 존재하지 않습니다");
    }
}
