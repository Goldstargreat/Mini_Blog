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

// 게시글 수정
app.put('/api/posts/:id', async (req, res, next) => {
    try {
        const postId = Number(req.params.id);
        const title = (req.body.title || '').trim();
        const content = (req.body.content || '').trim();
        if (!Number.isInteger(postId)) {
            return res.status(400).json({ message: '잘못된 게시글 번호입니다.' });
        }
        if (!title || !content) {
            return res.status(400).json({ message: '제목과 내용을 입력해 주세요.' });
        }

        const [result] = await pool.query(
            'UPDATE post SET title = ?, content = ? WHERE id = ?',
            [title, content, postId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '존재하지 않는 게시글입니다.' });
        }
        res.json({ id: postId, title, content });
    } catch (err) {
        next(err);
    }
});

// 게시글 삭제 (댓글은 FK의 ON DELETE CASCADE 로 함께 삭제됨)
app.delete('/api/posts/:id', async (req, res, next) => {
    try {
        const postId = Number(req.params.id);
        if (!Number.isInteger(postId)) {
            return res.status(400).json({ message: '잘못된 게시글 번호입니다.' });
        }

        const [result] = await pool.query('DELETE FROM post WHERE id = ?', [postId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '존재하지 않는 게시글입니다.' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

// 댓글 수정
app.put('/api/posts/:id/comments/:commentId', async (req, res, next) => {
    try {
        const postId = Number(req.params.id);
        const commentId = Number(req.params.commentId);
        const content = (req.body.content || '').trim();
        if (!Number.isInteger(postId) || !Number.isInteger(commentId)) {
            return res.status(400).json({ message: '잘못된 요청입니다.' });
        }
        if (!content) {
            return res.status(400).json({ message: '댓글 내용을 입력해 주세요.' });
        }

        const [result] = await pool.query(
            'UPDATE comment SET content = ? WHERE id = ? AND post_id = ?',
            [content, commentId, postId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '존재하지 않는 댓글입니다.' });
        }
        res.json({ id: commentId, content });
    } catch (err) {
        next(err);
    }
});

// 댓글 삭제
app.delete('/api/posts/:id/comments/:commentId', async (req, res, next) => {
    try {
        const postId = Number(req.params.id);
        const commentId = Number(req.params.commentId);
        if (!Number.isInteger(postId) || !Number.isInteger(commentId)) {
            return res.status(400).json({ message: '잘못된 요청입니다.' });
        }

        const [result] = await pool.query(
            'DELETE FROM comment WHERE id = ? AND post_id = ?',
            [commentId, postId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '존재하지 않는 댓글입니다.' });
        }
        res.status(204).end();
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
