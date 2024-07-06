/*
import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import getAPI from "../Api";
import Debounce from "./Debounce"; // useDebounce 훅을 임포트
import './index.css';

export default function Home() {
    const [hide, setHide] = useState(true);
    const [items, setItems] = useState([]);  // 초기 상태를 빈 배열로 설정
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const [query, setQuery] = useState(""); // 검색어 상태 관리

    const debouncedQuery = Debounce(query, 500); // 500ms 딜레이로 debounce 설정
    const [isLoadingUser, setIsLoadingUser] = useState(true); 
    const [user, setUser] = useState(null);

    // 로그인 후 토큰을 받아와서 로컬 스토리지에 저장하는 함수 (예제)
    const handleLogin = async () => {
        try {
            const response = await getAPI("login", "ko-KR", "1", "login", { username: "your-username", password: "your-password" });
            const token = response.token;
            localStorage.setItem('token', token);
            fetchUserData(token);
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    // 토큰을 이용해 유저 정보를 가져오는 함수
    const fetchUserData = async (token) => {
        try {
            const response = await getAPI("getUser", "ko-KR", "1", "user", { token });
            setUser(response.user);
            setIsLoadingUser(false);
        } catch (error) {
            console.error('User API Error:', error);
            setIsLoadingUser(false);
        }
    };

    useEffect(() => {
        // 로컬 스토리지에서 토큰을 가져와서 유저 정보를 요청
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData(token);
        } else {
            setIsLoadingUser(false);
        }
    }, []);

    useEffect(() => {
        if (debouncedQuery) {
            setHide(false);  // 요소 표시
            setIsLoading(true);  // 로딩 시작
            setError(null);  // 이전 에러 초기화
            console.log(`Searching for: ${debouncedQuery}`);  // 검색어 로그
            getAPI("search", "ko-KR", "1", "search", debouncedQuery)
                .then(n => {
                    console.log('API Response:', n);  // 응답 로그
                    setItems(n || []);  // API 결과 설정, 빈 배열로 디폴트 값 설정
                    setIsLoading(false);  // 로딩 종료
                })
                .catch(error => {
                    console.error('API Error:', error);  // 에러 로그
                    setError(error.message);  // 에러 설정
                    setIsLoading(false);  // 로딩 종료
                });
        } else {
            setHide(true);
            setItems([]);  // 검색어가 없을 때 아이템을 빈 배열로 설정
        }
    }, [debouncedQuery]);

    const searchHandler = (e) => {  // 사용자가 검색 창에 입력을 시작하면 호출됨
        setQuery(e.target.value);
    }

    return (
        <div className="container">
            <div className="titleWrap">
                {isLoadingUser ? (
                    <div className="slide_text">로딩 중...</div> 
                ) : (
                    user ? (
                        <div className="slide_text">{user.name}님 환영합니다!</div>
                    ) : (
                        <div style={{ marginTop: '8%' }} className="slide_text">환영합니다</div>
                    )
                )}
            </div>
            <div className="contentWrap">
                <div className="inputTitle">🎦 Find your movies!</div>
                <div className="inputWrap">
                    <input className="input" onChange={searchHandler} value={query} />
                </div>
                <div className="searchBoxWrap">
                    <div className={hide ? "searchBoxH" : "searchBox"}>
                        {isLoading && <p>데이터를 받아오는 중 입니다...</p>}
                        {error && <p>에러가 발생했습니다: {error}</p>}
                        {!isLoading && !error && items.length > 0 && items.map((item) => (
                            <Movie
                                key={item.id}
                                title={item.title}
                                poster_path={item.poster_path}
                                vote_average={item.vote_average}
                                overview={item.overview}
                                release_date={item.release_date}
                            />
                        ))}
                        {!isLoading && !error && items.length === 0 && !hide && <p>검색 결과가 없습니다.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
*/

import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import getAPI from "../Api";
import Debounce from "./Debounce"; // useDebounce 훅을 임포트
import './index.css';
import Sidebar from "../components/Sidebar";

export default function Home() {
    const [hide, setHide] = useState(true);
    const [items, setItems] = useState([]);  // 초기 상태를 빈 배열로 설정
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const [query, setQuery] = useState(""); // 검색어 상태 관리

    const debouncedQuery = Debounce(query, 500); // 500ms 딜레이로 debounce 설정
    const [isLoadingUser, setIsLoadingUser] = useState(true); 
    
    const [user, setUser] = useState(null);

  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };



    // 사용자 데이터를 가져오는 useEffect 추가
    useEffect(() => {
        // API 요청을 통해 사용자 데이터를 가져오는 예제 (필요에 맞게 수정)
        getAPI("getUser", "ko-KR")
            .then(response => {
                setUser(response.user); // 응답에 맞게 수정
                setIsLoadingUser(false);
            })
            .catch(error => {
                console.error('User API Error:', error);
                setIsLoadingUser(false);
            });
    }, []);

    useEffect(() => {
        if (debouncedQuery) {
            setHide(false);  // 요소 표시
            setIsLoading(true);  // 로딩 시작
            setError(null);  // 이전 에러 초기화
            console.log(`Searching for: ${debouncedQuery}`);  // 검색어 로그
            getAPI("search", "ko-KR", "1", "search", debouncedQuery)
                .then(n => {
                    console.log('API Response:', n);  // 응답 로그
                    setItems(n || []);  // API 결과 설정, 빈 배열로 디폴트 값 설정
                    setIsLoading(false);  // 로딩 종료
                })
                .catch(error => {
                    console.error('API Error:', error);  // 에러 로그
                    setError(error.message);  // 에러 설정
                    setIsLoading(false);  // 로딩 종료
                });
        } else {
            setHide(true);
            setItems([]);  // 검색어가 없을 때 아이템을 빈 배열로 설정
        }
    }, [debouncedQuery]);

    const searchHandler = (e) => {  // 사용자가 검색 창에 입력을 시작하면 호출됨
        setQuery(e.target.value);
    }

    
    return (
        <div className="container">
             <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <button onClick={toggleSidebar} className="open-sidebar-btn">
                ☰
            </button>
            <div className="titleWrap">
            {isLoadingUser ? (
              <div className="slide_text">로딩 중...</div> 
            ) : (
              user ? (
                <div className="slide_text">{user.name}님 환영합니다!</div>
              ) : (
                <div style={{ marginTop: '8%' }} className="slide_text">환영합니다</div>
              )
            )}
            </div>
            <div className="contentWrap">
                <div className="inputTitle">🎦 Find your movies!</div>
                <div className="inputWrap">
                    <input className="input" onChange={searchHandler} value={query} />
                </div>
                <div className="searchBoxWrap">
                    <div className={hide ? "searchBoxH" : "searchBox"}>
                        {isLoading && <p>데이터를 받아오는 중 입니다...</p>}
                        {error && <p>에러가 발생했습니다: {error}</p>}
                        {!isLoading && !error && items.length > 0 && items.map((item) => (
                            <Movie
                                key={item.id}
                                title={item.title}
                                poster_path={item.poster_path}
                                vote_average={item.vote_average}
                                overview={item.overview}
                                release_date={item.release_date}
                            />
                        ))}
                        {!isLoading && !error && items.length === 0 && !hide && <p>검색 결과가 없습니다.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}



/*import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import getAPI from "../Api";
import Debounce from "./Debounce"; // useDebounce 훅을 임포트
import './index.css';

export default function Home() {
    const [hide, setHide] = useState(true);
    const [items, setItems] = useState([]);  // 초기 상태를 빈 배열로 설정
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const [query, setQuery] = useState(""); // 검색어 상태 관리

    const debouncedQuery = Debounce(query, 500); // 500ms 딜레이로 debounce 설정
    const [isLoadingUser, setIsLoadingUser] = useState(true); 
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (debouncedQuery) {
            setHide(false);  // 요소 표시
            setIsLoading(true);  // 로딩 시작
            setError(null);  // 이전 에러 초기화
            console.log(`Searching for: ${debouncedQuery}`);  // 검색어 로그
            getAPI("search", "ko-KR", "1", "search", debouncedQuery)
                .then(n => {
                    console.log('API Response:', n);  // 응답 로그
                    setItems(n || []);  // API 결과 설정, 빈 배열로 디폴트 값 설정
                    setIsLoading(false);  // 로딩 종료
                })
                .catch(error => {
                    console.error('API Error:', error);  // 에러 로그
                    setError(error.message);  // 에러 설정
                    setIsLoading(false);  // 로딩 종료
                });
        } else {
            setHide(true);
            setItems([]);  // 검색어가 없을 때 아이템을 빈 배열로 설정
        }
    }, [debouncedQuery]);

    const searchHandler = (e) => {  // 사용자가 검색 창에 입력을 시작하면 호출됨
        setQuery(e.target.value);
    }

    
    return (
        <div className="container">
            <div className="titleWrap">
            {isLoadingUser ? (
              <div className="slide_text">로딩 중...</div> 
            ) : (
              user ? (
                <div className="slide_text">{user.name}님 환영합니다!</div>
              ) : (
                <div style={{ marginTop: '8%' }} className="slide_text">환영합니다</div>
              )
            )}
            </div>
            <div className="contentWrap">
                <div className="inputTitle">🎦 Find your movies!</div>
                <div className="inputWrap">
                    <input className="input" onChange={searchHandler} value={query} />
                </div>
                <div className="searchBoxWrap">
                    <div className={hide ? "searchBoxH" : "searchBox"}>
                        {isLoading && <p>데이터를 받아오는 중 입니다...</p>}
                        {error && <p>에러가 발생했습니다: {error}</p>}
                        {!isLoading && !error && items.length > 0 && items.map((item) => (
                            <Movie
                                key={item.id}
                                title={item.title}
                                poster_path={item.poster_path}
                                vote_average={item.vote_average}
                                overview={item.overview}
                                release_date={item.release_date}
                            />
                        ))}
                        {!isLoading && !error && items.length === 0 && !hide && <p>검색 결과가 없습니다.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
*/