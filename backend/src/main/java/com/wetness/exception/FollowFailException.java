package com.wetness.exception;

public class FollowFailException extends RuntimeException {
    private static final long serialVersionUID = -2238030302650813813L;

    public FollowFailException() {
        super("팔로우 등록/해재를 실패하였습니다.");
    }
}
