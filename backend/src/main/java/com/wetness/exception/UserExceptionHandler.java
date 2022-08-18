package com.wetness.exception;

import com.wetness.model.dto.response.BaseResponseEntity;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<?> expiredJwtException(ExpiredJwtException e) {
        return new ResponseEntity<BaseResponseEntity>(
                new BaseResponseEntity(401, "expired"), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<?> signatureException(SignatureException e) {
        return new ResponseEntity<BaseResponseEntity>(
                new BaseResponseEntity(401, "wrong signature"), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(NoJwtTokenException.class)
    public ResponseEntity<?> noJwtTokenException(NoJwtTokenException e) {
        return new ResponseEntity<BaseResponseEntity>(
                new BaseResponseEntity(401, "no token"), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(DropUserException.class)
    public ResponseEntity<?> dropUserException(DropUserException e) {
        return new ResponseEntity<BaseResponseEntity>(
                new BaseResponseEntity(401, "drop User"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FollowFailException.class)
    public ResponseEntity<?> FollowFailException(FollowFailException e) {
        return new ResponseEntity<BaseResponseEntity>(
                new BaseResponseEntity(401, "follow User"), HttpStatus.BAD_REQUEST);
    }
}
