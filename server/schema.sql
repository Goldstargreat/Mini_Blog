-- 미니 블로그 DB 스키마
CREATE DATABASE IF NOT EXISTS miniblog
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE miniblog;

-- 게시글
CREATE TABLE IF NOT EXISTS post (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(200) NOT NULL,
  content    TEXT         NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 댓글 (게시글 삭제 시 함께 삭제)
CREATE TABLE IF NOT EXISTS comment (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  post_id    INT          NOT NULL,
  content    VARCHAR(1000) NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_comment_post FOREIGN KEY (post_id)
    REFERENCES post (id) ON DELETE CASCADE
);
