import React from "react";
import './PostListItem.css';

function PostListItem(props) {
    const { post, onClick } = props;

    return (
        <div className="post-list-item" onClick={onClick}>
            <p className="post-list-item-title">{post.title}</p>
        </div>
    );

}

export default PostListItem;