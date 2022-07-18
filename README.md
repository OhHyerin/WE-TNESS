8# 웹/모바일(웹 기술) 스켈레톤 프로젝트

<!-- 필수 항목 -->

## 카테고리

| Application | Domain | Language | Framework |
| ---- | ---- | ---- | ---- |
| :white_check_mark: Desktop Web | :black_square_button: AI | :white_check_mark: JavaScript | :black_square_button: Vue.js |
| :black_square_button: Mobile Web | :black_square_button: Big Data | :black_square_button: TypeScript | :white_check_mark: React |
| :white_check_mark: Responsive Web | :black_square_button: Blockchain | :black_square_button: C/C++ | :black_square_button: Angular |
| :black_square_button: Android App | :black_square_button: IoT | :black_square_button: C# | :white_check_mark: Node.js |
| :black_square_button: iOS App | :black_square_button: AR/VR/Metaverse | :black_square_button: Python | :black_square_button: Flask/Django |
| :black_square_button: Desktop App | :black_square_button: Game | :white_check_mark: Java | :white_check_mark: Spring/Springboot |
| | | :black_square_button: Kotlin | |

<!-- 필수 항목 -->

## 프로젝트 소개

* 프로젝트명: 위트니스(WE-tness)
* 서비스 특징: 웹/모바일(웹 기술) 프로젝트
* 주요 기능
  - 회원 관리
  - 화상 미팅룸
  - 그룹 채팅
* 주요 기술
  - WebRTC
  - WebSocket
  - JWT Authentication
  - REST API
* 참조 리소스
  * Vuetify: 디자인 전반 적용
  * Vue Argon Design System: 디자인 전반 적용
  * Vue Black Dashboard Pro(유료): 캘린더 컴포넌트 사용
  * AR Core: 구글에서 제공하는 AR 지원 라이브러리. 이미지 인식 및 오버레이 영상에 활용
  * Color Thief: 이미지 색상 추출 라이브러리. 커버 사진 색상 추출 및 배경 변경에 활용
  * Animation.css: CSS 애니메이션 지원 라이브러리. 메인 페이지 진입 애니메이션에 활용
* 배포 환경
  - URL: // 웹 서비스, 랜딩 페이지, 프로젝트 소개 등의 배포 URL 기입
  - 테스트 계정: // 로그인이 필요한 경우, 사용 가능한 테스트 계정(ID/PW) 기입

<!-- 자유 양식 -->

## 팀 소개
* 오혜린 : 팀장, 백엔드 개발
* 배준성 : 부팀장, 기획 및 와이어프레임 작성, 프론트엔드 개발
* 김윤석 : 백엔드 개발 담당
* 류현수 : 백엔드 개발, Swagger API 문서 관리
* 이동근 : 프론트엔드 개발 담당

<!-- 자유 양식 -->

## 프로젝트 상세 설명

// 개발 환경, 기술 스택, 시스템 구성도, ERD, 기능 상세 설명 등

주제 : 비대면으로 쉽게 즐길 수 있는 webRTC + 모션인식 운동 플랫폼  
  
서비스명 : 위트니스(WE-tness)  
  
역할배분  
Backend : 오혜린, 김윤석, 류현수  
Frontend : 배준성, 이동근  
Infra : 오혜린, 김윤석, 류현수  
  
개발 스택  
BE : Java, SpringBoot, Swagger, JPA  
FE : HTML5, CSS3, Javascript, React, Redux  
Infra : Mysql, aws ec2, docker, jenkins +추가
  
## 협업 툴

- Git
- [Notion](https://cultured-paperback-2ca.notion.site/PJT-A205-WE-tness-7265acea434749f09da369df24d0ed16)
- [JIRA](https://jira.ssafy.com/secure/RapidBoard.jspa?rapidView=12681&projectKey=S07P12A205&view=planning&issueLimit=100)
- MatterMost
- Webex

## 협업 환경

- Gitlab
  - 버전관리
  - 이슈 발행 및 해결
  - 코드리뷰

- JIRA
  - 매주 새로운 sprint 진행
  - 업무 할당 및 Story Point 설정

- Notion
  - 회의 안건 정리, 회의록 작성
  - 컨벤션 정리
  - 기능 명세서, 스토리보드 등 팀내 공유 문서 정리
  - 개발 일지 작성 (개발 단계에서 어려웠던 점, 극복한 점 기록)

- Webex
  - 기획회의
  - 일일 스크럼

- MatterMost 
  - bot기능으로 commit 및 이슈생성 과정 기록
  - 팀원소통

## 협업 규칙 
## Git
**브랜치**

- main (메인브랜치)
    - develop (메인브랜치) (개발할때는 main이라고 생각)
        - front (메인브랜치)
            - feat-f/* (보조브랜치)
        - back (메인브랜치)
            - feat-b/* (보조브랜치)
- `*` : 기능이름

**Commit**

- 커밋 메세지
    - *type : *commit message *footer
- type
    - feat : 새로운 기능 추가
    - fix : 버그 수정
    - docs : 문서 수정
    - style : 코드 포매팅, 세미콜론 누락, 코드 변경이 없는 경우
    - refactor : 코드 리펙토링
    - test : 테스트 코드, 리펙토링 테스트 코드 추가
    - chore : 빌드 업무 수정, 패키지 매니저 수정
- footer
    - Jira 내부 Issue tracker id 기술

## Jira
- 매주 월요일 스프린트 등록
- 오전 스크럼 때 상기시켜주기
- 작업 후 done
- 용어 정리 [https://velog.io/@kjh1551/JIRA-학습-정리](https://velog.io/@kjh1551/JIRA-%ED%95%99%EC%8A%B5-%EC%A0%95%EB%A6%AC)
- 구조
  - Epic
  - Story
  - Sprint
