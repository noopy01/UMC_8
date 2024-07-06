import React, { useEffect, useState } from 'react';
/*
export default function UserInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                return;
            }

            try {
                const response = await fetch('http://your-server-url/auth/login', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    const result = await response.json();
                    setUserInfo(result);
                } else if (response.status === 404) {
                    throw new Error("User not found");
                } else {
                    throw new Error("Unknown error occurred");
                }
            } catch (error) {
                console.error('Error:', error.message);
                setError('Failed to fetch user info: ' + error.message);
            }
        };

        fetchUserInfo();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Info</h1>
            <p>Username: {userInfo.username}</p>
            <p>Name: {userInfo.name}</p>
            <p>Age: {userInfo.age}</p>
            <p>Email: {userInfo.email}</p>
        </div>
    );
}
*/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 토큰 및 사용자 이름 가져오기
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (token && storedUsername) {
            console.log('토큰:', token);
            setUsername(storedUsername);
        } else {
            console.log('토큰이 없습니다.');
            navigate('/login'); // 토큰이 없으면 로그인 페이지로 이동
        }
    }, [navigate]);

    const handleLogout = () => {
        // 토큰 삭제
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        alert('로그아웃 되었습니다.');
        navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
    };

    return (
        <div>
            {username ? <h1>Welcome, {username}!</h1> : <h1>Loading...</h1>}
            <button onClick={handleLogout}>
                로그아웃
            </button>
        </div>
    );
}

export default UserProfile;
