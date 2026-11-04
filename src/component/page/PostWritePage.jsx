import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import { createPost } from '../../api';
import './PostWritePage.css';


function PostWritePage(props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 입력해 주세요.');
            return;
        }
        try {
            setSubmitting(true);
            const newPost = await createPost(title, content);
            // 작성한 글의 상세 페이지로 이동
            navigate(`/post/${newPost.id}`);
        } catch (err) {
            alert(err.message);
            setSubmitting(false);
        }
    };

    return (
        <div className="write-wrapper">
            <div className="write-container">
                <TextInput
                    height={20}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />

                <TextInput
                    height={480}
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                    }}
                />

                <Button
                    title={submitting ? '작성 중...' : '글 작성하기'}
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
}

export default PostWritePage;
