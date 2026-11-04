// DB와 테이블을 만들고, 비어 있으면 seed-data.json 의 더미 데이터를 넣는다.
// 실행: npm run db:init
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function main() {
    const dbName = process.env.DB_NAME || 'miniblog';

    // DB가 아직 없을 수 있으므로 database 지정 없이 접속
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        charset: 'utf8mb4',
        multipleStatements: true,
    });

    try {
        const schema = fs
            .readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
            .replace(/\bminiblog\b/g, dbName);
        await conn.query(schema);
        console.log(`스키마 준비 완료 (DB: ${dbName})`);

        const [[{ count }]] = await conn.query('SELECT COUNT(*) AS count FROM post');
        if (count > 0) {
            console.log(`게시글이 이미 ${count}개 있어 더미 데이터는 넣지 않습니다.`);
            return;
        }

        const posts = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf8')
        );

        await conn.beginTransaction();
        for (const post of posts) {
            const [result] = await conn.query(
                'INSERT INTO post (title, content) VALUES (?, ?)',
                [post.title, post.content]
            );
            for (const comment of post.comments) {
                await conn.query(
                    'INSERT INTO comment (post_id, content) VALUES (?, ?)',
                    [result.insertId, comment.content]
                );
            }
        }
        await conn.commit();
        console.log(`더미 데이터 입력 완료: 게시글 ${posts.length}개`);
    } catch (err) {
        await conn.rollback().catch(() => {});
        throw err;
    } finally {
        await conn.end();
    }
}

main().catch((err) => {
    console.error('DB 초기화 실패:', err.message);
    process.exit(1);
});
