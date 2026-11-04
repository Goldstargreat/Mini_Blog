import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentList from '../list/CommentList';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import { getPost, createComment } from '../../api';
import './PostViewPage.css';

function PostViewPage(props) {
    const navigate = useNavigate();
    const { postId } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError('');
        getPost(postId)
            .then((data) => setPost(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [postId]);

    const handleSubmitComment = async () => {
        if (!comment.trim()) {
            alert('댓글 내용을 입력해 주세요.');
            return;
        }
        try {
            setSubmitting(true);
            const newComment = await createComment(postId, comment);
            // 작성한 댓글을 목록에 바로 반영
            setPost((prev) => ({ ...prev, comments: [...prev.comments, newComment] }));
            setComment('');
        } catch (err) {
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const backButton = (
        <Button
            title='뒤로 가기'
            onClick={() => {
                navigate('/');
            }}
        />
    );

    if (loading || error || !post) {
        return (
            <div className="view-wrapper">
                <div className="view-container">
                    {backButton}
                    <p className="title-text">{loading ? '불러오는 중...' : error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="view-wrapper">
            <div className="view-container">
                {backButton}
                <div className="post-container">
                    <p className="title-text">{post.title}</p>
                    <p className="content-text">{post.content}</p>
                </div>

                <p className="comment-label">댓글</p>
                <CommentList comments={post.comments} />

                <TextInput
                    height={40}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                />
                <Button
                    title={submitting ? '작성 중...' : '댓글 작성하기'}
                    onClick={handleSubmitComment}
                />
            </div>
        </div>
    );
}

export default PostViewPage;
