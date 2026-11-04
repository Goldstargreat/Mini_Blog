import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import { createPost, getPost, updatePost } from '../../api';
import './PostWritePage.css';

// /post-write 이면 새 글 작성, /post/:postId/edit 이면 기존 글 수정
function PostWritePage(props) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const isEdit = Boolean(postId);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(isEdit);
    const [submitting, setSubmitting] = useState(false);

    // 수정 모드: 기존 제목과 내용을 불러와 입력칸에 채움
    useEffect(() => {
        if (!isEdit) {
            setTitle('');
            setContent('');
            setLoading(false);
            return;
        }
        setLoading(true);
        getPost(postId)
            .then((post) => {
                setTitle(post.title);
                setContent(post.content);
            })
            .catch((err) => {
                alert(err.message);
                navigate('/');
            })
            .finally(() => setLoading(false));
    }, [isEdit, postId, navigate]);

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 입력해 주세요.');
            return;
        }
        try {
            setSubmitting(true);
            if (isEdit) {
                await updatePost(postId, title, content);
                // 수정한 글의 상세 페이지로 이동
                navigate(`/post/${postId}`);
            } else {
                const newPost = await createPost(title, content);
                // 작성한 글의 상세 페이지로 이동
                navigate(`/post/${newPost.id}`);
            }
        } catch (err) {
            alert(err.message);
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="write-wrapper">
                <div className="write-container">
                    <p>불러오는 중...</p>
                </div>
            </div>
        );
    }

    const submitTitle = isEdit
        ? (submitting ? '수정 중...' : '글 수정하기')
        : (submitting ? '작성 중...' : '글 작성하기');

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
                    title={submitTitle}
                    onClick={handleSubmit}
                />
                {isEdit && (
                    <Button
                        title='취소'
                        onClick={() => navigate(`/post/${postId}`)}
                    />
                )}
            </div>
        </div>
    );
}

export default PostWritePage;
