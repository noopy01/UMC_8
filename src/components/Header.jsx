import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../index.css'; // 한 디렉토리 위로 올라가서 index.css를 import

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            setIsLoggedIn(true);
            // Fetch the user data to display the username
            axios.get("http://localhost:8080/auth/me", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setUsername(response.data.name);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('Token');
        setIsLoggedIn(false);
        setUsername("");
        navigate("/login");
    };

    return (
        <div className="header-container">
            <div className="header-wrap">
                <div className="header-left-wrap">
                    <ul>
                        <li>
                            <Link className="header-item" to='/'>
                                <p className="ho">UMC Movie</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="header-nav-item" to='/popular'>
                                <p className="ho">Popular</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="header-nav-item" to='/now playing'>
                                <p className="ho">Now Playing</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="header-nav-item" to='/top rated'>
                                <p className="ho">Top Rated</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="header-nav-item" to='/upcoming'>
                                <p className="ho">Upcoming</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="header-right-wrap">
                    {isLoggedIn ? (
                        <>
                            <span className="welcome-message">{username}님 환영합니다.</span>
                            <button className="header-nav-item logout-button" onClick={handleLogout}>로그아웃</button>
                        </>
                    ) : (
                        <>
                            <Link className="header-nav-item" to='/login'>
                                <p className="ho">로그인</p>
                            </Link>
                            <Link className="header-nav-item" to='/sign'>
                                <p className="ho">회원가입</p>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}



/*import React from "react";
import { Link } from "react-router-dom";


export default function Header(){

    return (
    <div className="header-container">
        <div className="header-wrap">
            <div className="header-left-wrap">
             <ul>

                <li>
               <Link className="header-item" to='/'>
                <p className="ho">UMC Movie</p>
                </Link> </li>
    
                <li>
                <Link className="header-nav-item" to='/login'>
                <p className="ho" >로그인</p>  
                </Link>   </li>  

                <li>
                <Link className="header-nav-item" to='/sign'>
                <p className="ho">회원가입</p>  
                </Link>   </li>  
               
                <li>
                    <Link className="header-nav-item" to='/popular'>          
                    <p className="ho">Popular</p>
                    </Link>
                </li>
                <li>
                    <Link className="header-nav-item" to='/now playing'>
                    <p className="ho">Now Playing</p>          
                    </Link>
                </li>
                <li>
                    <Link className="header-nav-item" to='/top rated'>          
                    <p className="ho">Top Rated</p> 
                    </Link>
                </li>
                <li>
                    <Link className="header-nav-item" to='/upcoming '>          
                    <p className="ho"> Upcoming </p>
                    </Link>
                </li>
    
             </ul>
            </div>
        </div>

    </div>
    )
}
*/