# 🌟 미니 블로그 프로젝트 (Mini Blog Project)

본 프로젝트는 **웹 프로그래밍 기초** 수업의 기말고사 대체 과제로, 기존에 HTML/CSS/JavaScript로 제작했던 홈페이지의 주요 페이지를 **React 함수형 컴포넌트**를 사용하여 재구현한 애플리케이션입니다. [cite_start]네이버 블로그를 모방하여 게시판 및 방명록 기능을 통합한 미니 블로그 형태로 구현되었습니다[cite: 23].

## 💻 프로젝트 개요

| 구분 | 내용 |
| :--- | :--- |
| **과제명** | [cite_start]기말고사 대체 과제 (Term Project) [cite: 12] |
| **주제** | [cite_start]홈페이지 제작 및 2페이지 이상을 React로 작성 (미니 블로그 구현) [cite: 13] |
| **개발 언어/프레임워크** | React (함수형 컴포넌트), JavaScript, HTML, CSS |
| **주요 기술** | [cite_start]React Router DOM, useState Hook, 배열 렌더링, 폼 핸들링 [cite: 24, 25, 75] |
| **데이터** | [cite_start]더미 데이터 (JSON 형태) 사용 [cite: 18, 20] |
| [cite_start]**GitHub Repository** | https://github.com/Goldstargreat/Mini_Blog [cite: 14] |

## ⚙️ 주요 기술 및 구현 목표

### [cite_start]1. 기술적 초점 [cite: 18]

* [cite_start]**함수형 컴포넌트 및 Hooks:** `useState`를 활용한 데이터 상태 관리 및 `useEffect` (보고서에는 언급 없음, 일반적인 구현 시 사용 예상) 등의 Hooks 사용 능력을 숙달[cite: 24, 81].
* [cite_start]**SPA 구현:** `React Router`를 이용한 자연스러운 페이지 이동 (라우팅) 구현[cite: 25].
* [cite_start]**컴포넌트 기반 개발:** UI를 재사용 가능한 독립적인 컴포넌트로 분리하고 조합하여 개발[cite: 83, 84].

### 2. 더미 데이터 사용 이유

[cite_start]본 과제에서는 데이터베이스와 서버를 구축하는 부분까지는 다루지 못하므로, 백엔드에 해당하는 데이터는 **JSON 형태의 더미 데이터**로 대체하였습니다[cite: 19, 20]. [cite_start]따라서 실제로 글이나 댓글이 데이터베이스에 저장되지는 않습니다[cite: 21].

## ✨ 주요 구현 페이지

### 1. 메인 페이지 (Post List)

* [cite_start]**URL:** `localhost:3000` [cite: 28]
* [cite_start]**기능:** `React-Router-Dom`을 통해 라우팅을 구성하고 [cite: 37][cite_start], JSON 파일로 게시물 목록을 동적으로 생성합니다[cite: 37]. [cite_start]각 항목 클릭 시 상세 페이지로 이동합니다[cite: 38].
* [cite_start]**UI/UX:** 깔끔한 카드 형태로 주요 포스트를 한눈에 보여주며, '글 작성하기' 버튼을 상단에 배치하여 새로운 콘텐츠 생성에 쉽게 접근할 수 있습니다[cite: 39, 40].

### 2. 포스트 상세 페이지 (Post Detail & Comment)

* [cite_start]**URL:** `localhost:3000/post/:postId` (동적 라우팅) [cite: 42, 59]
* [cite_start]**기능:** **동적 라우팅**을 구현하여 URL 파라미터에 따라 해당 ID의 포스트 내용을 불러옵니다[cite: 59]. [cite_start]`useState` Hook을 사용하여 댓글 목록과 입력 상태를 관리하며, 댓글은 **배열 렌더링**을 통해 출력됩니다[cite: 60].
* **UI/UX:** 본문과 댓글 영역을 구분하여 가독성을 높였습니다. [cite_start]'뒤로 가기' 버튼을 제공하여 쉽게 이전 목록으로 복귀할 수 있으며, 댓글 작성 후 즉시 목록에 반영되도록 했습니다[cite: 61, 62].

### 3. 포스트 작성 페이지 (Post Write)

* [cite_start]**URL:** `localhost:3000/post-write` [cite: 67]
* [cite_start]**기능:** `useState` Hook을 사용해 제목과 본문의 입력 값 상태를 관리하는 **폼 핸들링**을 구현했습니다[cite: 75]. [cite_start]'글 작성하기' 버튼 클릭 이벤트 처리 후 메인 페이지로 라우팅됩니다[cite: 76].
* [cite_start]**UI/UX:** 제목과 내용 입력 영역을 구분했으며, '글 작성하기' 버튼을 하단에 배치하여 작성 완료 후 바로 제출할 수 있게 했습니다[cite: 77, 78].

## 🚀 실행 방법 (Local)

1.  **프로젝트 클론**
    ```bash
    git clone [https://github.com/Goldstargreat/Mini_Blog.git](https://github.com/Goldstargreat/Mini_Blog.git)
    cd Mini_Blog
    ```
2.  **의존성 설치**
    ```bash
    npm install
    # 또는 yarn install
    ```
3.  **애플리케이션 실행**
    ```bash
    npm start
    # 또는 yarn start
    ```
    (브라우저에서 `localhost:3000`으로 접속됩니다.)








## 빌드 완료
 Serving!                                 │
   │                                            │
   │   - Local:    http://localhost:3000        │
   │   - Network:  http://192.168.24.155:3000   │
   │                                            │
   │   Copied local address to clipboard! 
