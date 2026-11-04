import React from 'react';
import './CommentList.css'; // 새로 만든 CSS 파일 import
import CommentListItem from './CommentListItem';

function CommentList(props) {
    const { comments, onUpdate, onDelete } = props;

    return (
        <div className="comment-list-wrapper">
            {comments.map((comment) => {
                return (
                    <CommentListItem
                        key={comment.id}
                        comment={comment}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                );
            })}
        </div>
    );
}

export default CommentList;