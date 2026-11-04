const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

// 게시글 목록
app.get('/api/posts', async (req, res, next) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, title, content, created_at FROM post ORDER BY id DESC'
        );
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// 게시글 상세 (+ 댓글)
app.get('/api/posts/:id', async (req, res, next) => {
    try {
        const postId = Number(req.params.id);
        if (!Number.isInteger(postId)) {
            return res.status(400).json({ message: '잘못된 게시글 번호입니다.' });
        }

        const [[post]] = await pool.query(
            'SELECT id, title, content, created_at FROM post WHERE id = ?',
            [postId]
        );
        if (!post) {
            return res.status(404).json({ message: '존재하지 않는 게시글입니다.' });
        }

        const [comments] = await pool.query(
            'SELECT id, content, created_at FROM comment WHERE post_id = ? ORDER BY id',
            [postId]
        );
        res.json({ ...post, comments });
    } catch (err) {
        next(err);
    }
});

// 게시글 작성
app.post('/api/posts', async (req, res, next) => {
    try {
        const title = (req.body.title || '').trim();
        const content = (req.body.content || '').trim();
        if (!title || !content) {
            return res.status(400).json({ message: '제목과 내용을 입력해 주세요.' });
        }

        const [result] = await pool.query(
            'INSERT INTO post (title, content) VALUES (?, ?)',
            [title, content]
        );
        res.status(201).json({ id: result.insertId, title, content });
    } catch (err) {
        next(err);
    }
});

// 댓글 작성
app.post('/api/posts/:id/comments', async (req, res, next) => {
    try {
        const postId = Number(req.params.id);
        const content = (req.body.content || '').trim();
        if (!Number.isInteger(postId)) {
            return res.status(400).json({ message: '잘못된 게시글 번호입니다.' });
        }
        if (!content) {
            return res.status(400).json({ message: '댓글 내용을 입력해 주세요.' });
        }

        const [[post]] = await pool.query('SELECT id FROM post WHERE id = ?', [postId]);
        if (!post) {
            return res.status(404).json({ message: '존재하지 않는 게시글입니다.' });
        }

        const [result] = await pool.query(
            'INSERT INTO comment (post_id, content) VALUES (?, ?)',
            [postId, content]
        );
        res.status(201).json({ id: result.insertId, content });
    } catch (err) {
        next(err);
    }
});

// 공통 에러 처리
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
});

app.listen(PORT, () => {
    console.log(`API 서버 실행 중: http://localhost:${PORT}`);
});
