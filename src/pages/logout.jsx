import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 토큰 삭제
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        alert('로그아웃 되었습니다.');
        navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
    };

    return (
        <button onClick={handleLogout}>
            로그아웃
        </button>
    );
}

export default LogoutButton;
