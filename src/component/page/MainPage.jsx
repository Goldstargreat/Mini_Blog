import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from '../list/PostList';
import Button from '../ui/Button';
import { getPosts } from '../../api';
import './MainPage.css';

function MainPage(props) {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getPosts()
            .then((data) => setPosts(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="main-wrapper">
            <div className="main-container">
                <Button
                    title='글 작성하기'
                    onClick={() => {
                        navigate('/post-write');
                    }}
                />

                {loading && <p>불러오는 중...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && !error && posts.length === 0 && <p>아직 작성된 글이 없습니다.</p>}

                <PostList
                    posts={posts}
                    onClickItem={(item) => {
                        navigate(`/post/${item.id}`);
                    }}
                />
            </div>
        </div>
    );
}

export default MainPage;
