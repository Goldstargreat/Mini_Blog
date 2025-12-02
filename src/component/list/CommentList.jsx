import React from 'react';
import './CommentList.css'; // 새로 만든 CSS 파일 import
import CommentListItem from './CommentListItem';

function CommentList(props) {
    const { comments } = props;

    return (
        <div className="comment-list-wrapper">
            {comments.map((comment, index) => {
                return (
                    <CommentListItem
                        key={comment.id}
                        comment={comment}
                    />
                );
            })}
        </div>
    );
}

export default CommentList;