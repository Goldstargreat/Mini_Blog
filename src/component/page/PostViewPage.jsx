import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../list/CommentList';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import data from '../../data.json';
import './PostViewPage.css'

function PostViewPage(props) {
    const navigate = useNavigate();
    const { postId } = useParams();

    const post = data.find((item) => {
        return item.id == postId;
    });

    const [comment, setComment] = useState('');

    return (
        <div className="wrapper">
            <div className="container">
                <Button
                    title='뒤로 가기'
                    onClick={() => {
                        navigate('/');
                    }}
                />
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
                    title='댓글 작성하기'
                    onClick={() => {
                        navigate('/');
                    }}
                />
            </div>
        </div>
    );
}

export default PostViewPage;