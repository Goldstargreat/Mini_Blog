import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostList from '../list/PostList';
import Button from '../ui/Button';
import data from '../../data.json';
import './MainPage.css';

function MainPage(props) {
    const navigate = useNavigate();

    return (
        <div className="wrapper">
            <div className="container">
                <Button
                    title='글 작성하기'
                    onClick={() => {
                        navigate('/post-write');
                    }}
                />

                <PostList
                    posts={data}
                    onClickItem={(item) => {
                        navigate(`/post/${item.id}`);
                    }}
                />
            </div>
        </div>
    );
}

export default MainPage;