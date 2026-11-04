# 🌟 미니 블로그 프로젝트 (Mini Blog Project)

본 프로젝트는 **웹 프로그래밍 기초** 수업의 기말고사 대체 과제로, 기존에 HTML/CSS/JavaScript로 제작했던 홈페이지의 주요 페이지를 **React 함수형 컴포넌트**를 사용하여 재구현한 애플리케이션입니다. 네이버 블로그를 모방하여 게시판 및 방명록 기능을 통합한 미니 블로그 형태로 구현되었습니다.

## 💻 프로젝트 개요

| 구분 | 내용 |
| :--- | :--- |
| **과제명** | 기말고사 대체 과제 (Term Project)  |
| **주제** | 홈페이지 제작 및 2페이지 이상을 React로 작성 (미니 블로그 구현)  |
| **개발 언어/프레임워크** | React (함수형 컴포넌트), Node.js(Express), JavaScript, HTML, CSS |
| **주요 기술** | React Router DOM, useState Hook, 배열 렌더링, 폼 핸들링  |
| **데이터베이스** | MySQL 8 (Node.js Express API 서버 경유) |
| **GitHub Repository** | https://github.com/Goldstargreat/Mini_Blog  |

## ⚙️ 주요 기술 및 구현 목표

### 1. 기술적 초점 

* **함수형 컴포넌트 및 Hooks:** `useState`를 활용한 데이터 상태 관리 및 `useEffect` 등의 Hooks 사용 능력 숙달.
* **SPA 구현:** `React Router`를 이용한 자연스러운 페이지 이동 (라우팅) 구현.
* **컴포넌트 기반 개발:** UI를 재사용 가능한 독립적인 컴포넌트로 분리하고 조합하여 개발.

### 2. 데이터베이스 연동 (MySQL)

처음에는 JSON 더미 데이터를 사용했으나, **Express API 서버 + MySQL**로 교체하여 글과 댓글이 실제 DB에 저장되도록 구현했습니다.

```
React (localhost:3000)  ──/api 요청──▶  Express (localhost:4000)  ──▶  MySQL (miniblog DB)
```

| 메서드 | 경로 | 설명 |
| :--- | :--- | :--- |
| GET | `/api/posts` | 게시글 목록 |
| GET | `/api/posts/:id` | 게시글 상세 + 댓글 |
| POST | `/api/posts` | 게시글 작성 (`title`, `content`) |
| POST | `/api/posts/:id/comments` | 댓글 작성 (`content`) |

테이블 구조는 `server/schema.sql` 에 있으며, 기존 더미 데이터(`server/seed-data.json`)는 최초 실행 시 초기 데이터로 입력됩니다.

## ✨ 주요 구현 페이지

### 1. 메인 페이지 (Post List)

* **URL:** `localhost:3000` 
* **기능:** `React-Router-Dom`을 통해 라우팅을 구성하고, DB에서 불러온 게시물 목록을 동적으로 생성합니다. 각 항목 클릭 시 상세 페이지로 이동합니다.
* **UI/UX:** 깔끔한 카드 형태로 주요 포스트를 한눈에 보여주며, '글 작성하기' 버튼을 상단에 배치하여 새로운 콘텐츠 생성에 쉽게 접근할 수 있습니다.

### 2. 포스트 상세 페이지 (Post Detail & Comment)

* **URL:** `localhost:3000/post/:postId` (동적 라우팅) 
* **기능:** **동적 라우팅**을 구현하여 URL 파라미터에 따라 해당 ID의 포스트 내용을 불러옵니다. `useState` Hook을 사용하여 댓글 목록과 입력 상태를 관리하며, 댓글은 **배열 렌더링**을 통해 출력됩니다.
* **UI/UX:** 본문과 댓글 영역을 구분하여 가독성을 높였습니다. '뒤로 가기' 버튼을 제공하여 쉽게 이전 목록으로 복귀할 수 있으며, 댓글 작성 후 즉시 목록에 반영되도록 했습니다.

### 3. 포스트 작성 페이지 (Post Write)

* **URL:** `localhost:3000/post-write` 
* **기능:** `useState` Hook을 사용해 제목과 본문의 입력 값 상태를 관리하는 **폼 핸들링**을 구현했습니다. '글 작성하기' 버튼을 누르면 글이 DB에 저장되고 작성한 글의 상세 페이지로 이동합니다.
* **UI/UX:** 제목과 내용 입력 영역을 구분했으며, '글 작성하기' 버튼을 하단에 배치하여 작성 완료 후 바로 제출할 수 있게 했습니다.

## 🚀 실행 방법 (Local)

1.  **프로젝트 클론**
    ```bash
    git clone https://github.com/Goldstargreat/Mini_Blog.git
    cd Mini_Blog
    ```
2.  **MySQL 준비**

    MySQL 8 서버가 실행 중이어야 합니다. `server/.env.example` 을 `server/.env` 로 복사한 뒤 접속 정보를 입력합니다.
    ```bash
    cd server
    cp .env.example .env   # DB_USER, DB_PASSWORD 등 수정
    ```
3.  **API 서버 설치 · DB 초기화 · 실행** (`server` 폴더에서)
    ```bash
    npm install
    npm run db:init   # miniblog DB와 테이블 생성 + 초기 데이터 입력
    npm start         # http://localhost:4000
    ```

    > 💡 루트 폴더에서 `npm start` 를 실행하면 API 서버(4000)와 React(3000)가 **한 번에** 실행됩니다.
    > 각각 따로 실행하려면 `npm run server` / `npm run client` 를 사용하세요.
4.  **React 앱 설치 · 실행** (새 터미널, 프로젝트 루트에서)
    ```bash
    npm install
    npm start
    ```
    (브라우저에서 `localhost:3000`으로 접속됩니다. `/api` 요청은 `package.json`의 `proxy` 설정으로 API 서버에 전달됩니다.)
