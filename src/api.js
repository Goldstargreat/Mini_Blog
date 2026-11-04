// 백엔드(Express + MySQL) API 호출 모음
// 개발 중에는 package.json 의 "proxy" 설정으로 /api 요청이 http://localhost:4000 으로 전달된다.

async function request(url, options = {}) {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
        const error = new Error((data && data.message) || '요청에 실패했습니다.');
        error.status = response.status;
        throw error;
    }
    return data;
}

export function getPosts() {
    return request('/api/posts');
}

export function getPost(postId) {
    return request(`/api/posts/${postId}`);
}

export function createPost(title, content) {
    return request('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
    });
}

export function createComment(postId, content) {
    return request(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
    });
}

export function updatePost(postId, title, content) {
    return request(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
    });
}

export function deletePost(postId) {
    return request(`/api/posts/${postId}`, { method: 'DELETE' });
}

export function updateComment(postId, commentId, content) {
    return request(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
    });
}

export function deleteComment(postId, commentId) {
    return request(`/api/posts/${postId}/comments/${commentId}`, { method: 'DELETE' });
}
