import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentList from '../list/CommentList';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import { getPost, createComment, deletePost, updateComment, deleteComment } from '../../api';
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

    const handleDeletePost = async () => {
        if (!window.confirm('이 글을 삭제할까요? 댓글도 함께 삭제됩니다.')) {
            return;
        }
        try {
            await deletePost(postId);
            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    };

    // 성공하면 true 를 돌려줘서 댓글 항목이 수정 모드를 닫게 함
    const handleUpdateComment = async (commentId, content) => {
        try {
            const updated = await updateComment(postId, commentId, content);
            setPost((prev) => ({
                ...prev,
                comments: prev.comments.map((c) =>
                    c.id === commentId ? { ...c, content: updated.content } : c
                ),
            }));
            return true;
        } catch (err) {
            alert(err.message);
            return false;
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('이 댓글을 삭제할까요?')) {
            return;
        }
        try {
            await deleteComment(postId, commentId);
            // 삭제한 댓글을 목록에서 바로 제거
            setPost((prev) => ({
                ...prev,
                comments: prev.comments.filter((c) => c.id !== commentId),
            }));
        } catch (err) {
            alert(err.message);
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
                <div className="button-row">
                    {backButton}
                    <div className="button-group">
                        <Button title='글 수정하기' onClick={() => navigate(`/post/${postId}/edit`)} />
                        <Button title='글 삭제하기' onClick={handleDeletePost} />
                    </div>
                </div>
                <div className="post-container">
                    <p className="title-text">{post.title}</p>
                    <p className="content-text">{post.content}</p>
                </div>

                <p className="comment-label">댓글</p>
                <CommentList
                    comments={post.comments}
                    onUpdate={handleUpdateComment}
                    onDelete={handleDeleteComment}
                />

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
