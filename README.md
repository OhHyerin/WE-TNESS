# **🥇WE-TNESS🥈**
#### WebRTC와 모션인식을 활용한 운동 게임 서비스

<br>
<br>


## 목차
1. 서비스 소개
    1. 주요 기능 및 시연화면
    2. 기본 기능 및 시연화면
2. 개발환경
    1. 시스템 환경
    2. Technical Architecture Diagram
3. 팀원 소개

<br>
<br>


## 1. 서비스 소개
![intro](https://user-images.githubusercontent.com/44857166/187242914-c3ef1eeb-936c-4c8b-8719-fac0f7903fba.mp4)


항상 작심 일일을 실행하고 있진 않으신가요?

요즘 날씨, 밖에 나가서 운동하기 힘들죠?

**그냥** 숨쉬기도 버거운데 운동이 재미없으면 어떻게 해요?

하지만 운동을 게임처럼 즐겁게 할 수 있다면?

위트니스와 함께라면 가능합니다. 

<br>
<br>

## 주요기능 및 시연화면

<br>

### 게임 화면 - 플레이 화면

![게임 화면 - 플레이 화면](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/b485df7cf9311b8b437274397405b813/_EC_83_88_EB_A1_9C_EC_9A_B4__ED_94_84_EB_A1_9C_EC_A0_9D_ED_8A_B8.gif)

### 운동 - 푸시업

![운동 - 푸시업](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/2a66ffbbb9d9dd970c86de7accf0b4e8/_ED_91_B8_EC_8B_9C_EC_97_85-min.gif)

### 운동 - 런지

![운동 - 런지](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/33bf6319d58d1d23cf8972e9813aa997/_EB_9F_B0_EC_A7_80-min.gif)

### 운동 -스쿼트

![운동 - 스쿼트](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/e197dae8fbc924f0bde96e50c8994e10/_EC_8A_A4_EC_BF_BC_ED_8A_B8-min.gif)

### 운동 - 버피

![운동 - 버피](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/dac453436ea79005a5e51e53c8b9e79d/_EB_B2_84_ED_94_BC-min.gif)

### Teachable Machine - 버피, 스쿼트, 푸시업, 런지

![버피](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/d3de737643a0f3af72838b7682439c3c/_EB_B2_84_ED_94_BC__EB_AA_A8_EC_85_98_EC_BA_A1_EC_B2_98.gif)

![스쿼트](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/b6f2732d14cdb4163f5267f17b240b62/_ED_91_B8_EC_8B_9C_EC_97_85__EB_AA_A8_EC_85_98_EC_BA_A1_EC_B2_98.gif)

![푸시업](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/6d8f6d679b5145afa9a4d3a45a718acd/_EC_8A_A4_EC_BF_BC_ED_8A_B8__EB_AA_A8_EC_85_98_EC_BA_A1_EC_B2_98.gif)

![런지](/uploads/9c31dcaaf15d4b44b116faac27f27c0f/_EB_9F_B0_EC_A7_80__EB_AA_A8_EC_85_98_EC_BA_A1_EC_B2_98.gif)

<br>
<br>

## 기본기능 및 시연화면


### 홈 화면 - 현재 생성된 방

![home](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/6fc0655417e4a2f36e5ba3bc4071bd30/home.png)

### 방 생성 - 게임 종류, 제목 및 암호 설정

![room_create](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/fc435434194bccdfdd3c921fbadada58/room_create.png)

### 튜토리얼 - 카메라 세팅 및 운동 별 가이드

![screen-recording__2_](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/45224d5dbe61dbdfc0e4bade546049f6/screen-recording__2_.webm)

### 랭킹 페이지 - 게임 종류 별(중복 선택 가능) 및 지역 별 랭킹

![screen-recording__1_](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/0ad8cdb61bb5aed0ed4c4a727f43b871/screen-recording__1_.webm)

### 검색 - 유저, 방 검색 및 유저 운동 기록 조회

![screen-recording](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/04caf34d0a7eb8146d52af7cd79e1111/screen-recording.webm)


<br>
<br>


## 개발환경


### 시스템 환경

---

- **Frontend**
    - React v5.0.1
    - node.js v16.14.0
    - npm v8.7.0
    - redux-toolkit v1.8.3
    - styled-components v5.3.5
    
- **CI/CD & Database**
    - AWS ec2 - Ubuntu 20.04.4 LTS
    - Docker 20.10.12
    - Jenkins 2.346.3
    - nginx/1.18.0 (Ubuntu)
    - MySQL 8.0.30-0ubuntu0.20.04.2
    - certbot 0.40.0

- **Backend**
    - Spring Boot 2.7.1
    - Spring Data JPA 2.7.1
    - Spring Security 5.7.2
    - Spring Cloud 2.2.6

- **Web RTC**
    - openVidu 2.22.0
    
- **Tools**
    - Intellij 2022.2
    - VS Code
    - Google Chrome 104.0.5112.81

### Technical Architecture Diagram

![wetness_archi__1_](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A205/uploads/546abfed1fd1a0dc861352219b1a66db/wetness_archi__1_.jpg)


## 팀원 소개

- 오혜린(팀장)
    - 백엔드
    - User, Rank관련 API 구현
    - 데이터베이스 설계
    - Jenkins를 사용한 자동빌드
    - nginx세팅
    - EC2 서버 환경 세팅 및 배포
    - 최종 발표
    
- 김윤석
    - 백엔드
    - user 로그인 관련 기능 개발
    - 팔로우, 알림, 신고, 어워드 기능 개발

- 류현수
    - 백엔드
    - Spring Security 활용한 user 인증 구현
    - Openvidu 활용 WebRTC 환경 구축
    - 소셜 로그인 구현(카카오)

- 배준성
    - 프론트엔드
    - 요구사항 명세서 작성
    - react-toolkit & react-router-dom 활용 SPA 구현
    - axios 요청을 통한 api 통신
    - 튜토리얼 페이지 제작
    - 디자인 및 프로토타입 제작
    - 운동별 애니메이션 제작
    - styled-components 활용 css 스타일링
    - 협업과 코드 리팩토링을 위한 ESLint 설정

- 이동근
    - 프론트엔드
    - react 컴포넌트 구조 설계
    - react-toolkit & react-router-dom 활용 SPA 구현
    - axios 요청을 통한 api 통신
    - 회원 CRUD 구현 (회원가입, 로그인, 정보 수정, 비밀번호 수정, 팔로우 등)
    - 소셜 로그인 구현 (카카오)
    - Openvidu 활용 게임방 실시간 데이터 교환 구현
    - teachable machine 활용 동작인식 구현
    - styled-components 활용 css 스타일링

- 한유연
    - 백엔드
    - 게임 관련 기능 (게임 생성 및 결과 저장 등) API 구현
    - 사용자 운동 기록 관련 API 구현
    - 다이어리 관련 기능, S3 버킷 연동 통해 리소스 관리 API 구현
    - EC2 서버 환경 세팅 및 배포
        - DB 세팅 및 관리
        - Nginx 통한 프록시 설정
        - Certbot 통해 SSL 구축
