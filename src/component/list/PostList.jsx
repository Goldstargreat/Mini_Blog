import React from 'react';
import './PostList.css';
// import styled from 'styled-components';
import PostListItem from './PostListItem';


function PostList(props) {
    const { posts, onClickItem } = props;

    return (
        <div className="post-list-wrapper">
            {posts.map((post) => {
                return (
                    <PostListItem
                        key={post.id}
                        post={post}
                        onClick={() => {
                            onClickItem(post);
                        }}
                    />
                );
            })}
        </div>
    );
}

export default PostList;