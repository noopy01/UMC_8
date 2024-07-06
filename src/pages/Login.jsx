import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
`;

const Banner = styled.div`
    background-color: #f0f0f0;
    padding: 10px;
    text-align: center;
`;

export default function Login() {
    const { register, formState: { errors, isValid }, handleSubmit } = useForm({
        mode: "onChange"
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("Submitting data: ", data);
        try {
            const response = await axios.post("http://localhost:8080/auth/login", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response.data.token;
            localStorage.setItem('Token', token);
            console.log(response.data);
            alert("로그인에 성공하셨습니다!");
            setLoggedIn(true);
            fetchUserData(token);
            navigate(`/`);
        } catch (error) {
            console.error("Error logging in:", error);
            if (error.response) {
                setErrorMessage(`로그인에 실패했습니다: ${error.response.data.message}`);
            } else {
                setErrorMessage("로그인에 실패했습니다. 네트워크 문제를 확인하세요.");
            }
        }
    };

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get("http://localhost:8080/auth/me", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsername(response.data.name);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            fetchUserData(token);
        }
    }, []);
    
    const buttonClassName = isValid ? "sub-active" : "sub";
    return (
        <div>
            {loggedIn && username && <Banner>{username}님 환영합니다.</Banner>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="total1">
                    <div className="login_page">
                        <div className="login_title">
                            로그인 페이지
                        </div>
                        <div className="login_content">
                            <input
                                type='text'
                                className="id"
                                placeholder="아이디를 입력해주세요."
                                {...register('username', {
                                    required: "아이디는 필수입력사항입니다.",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "아이디를 영어로 입력해주세요"
                                    }
                                })}
                            />
                            {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}

                            <input
                                type='password'
                                className="id_pw"
                                placeholder="비밀번호를 입력해주세요."
                                {...register('password', {
                                    required: "비밀번호는 필수 입력 항목입니다.",
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                        message: "영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요"
                                    }
                                })}
                            />
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        </div>
                        <div>
                            <button className={ buttonClassName } disabled={!isValid} type="submit">
                                로그인하기
                            </button>
                            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}



/*import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
`;

const Banner = styled.div`
    background-color: #f0f0f0;
    padding: 10px;
    text-align: center;
`;

export default function Login({ setToken }) {
    const { register, formState: { errors, isValid }, handleSubmit } = useForm({
        mode: "onChange"
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("Submitting data: ", data);
        try {
            const response = await axios.post("http://localhost:8080/auth/login", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response.data.token;
            localStorage.setItem('Token', token);
            setToken(token); // Set token using the passed setToken function
            console.log(response.data);
            alert("로그인에 성공하셨습니다!");
            setLoggedIn(true);
            fetchUserData(token);
            navigate(`/`);
        } catch (error) {
            console.error("Error logging in:", error);
            if (error.response) {
                setErrorMessage(`로그인에 실패했습니다: ${error.response.data.message}`);
            } else {
                setErrorMessage("로그인에 실패했습니다. 네트워크 문제를 확인하세요.");
            }
        }
    };

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get("http://localhost:8080/auth/me", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsername(response.data.name);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const buttonClassName = isValid ? "sub-active" : "sub";

    return (
        <div>
            {loggedIn && username && <Banner>{username}님 환영합니다.</Banner>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="total1">
                    <div className="login_page">
                        <div className="login_title">
                            로그인 페이지
                        </div>
                        <div className="login_content">
                            <input
                                type='text'
                                className="id"
                                placeholder="아이디를 입력해주세요."
                                {...register('username', {
                                    required: "아이디는 필수입력사항입니다.",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "아이디를 영어로 입력해주세요"
                                    }
                                })}
                            />
                            {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}

                            <input
                                type='password'
                                className="id_pw"
                                placeholder="비밀번호를 입력해주세요."
                                {...register('password', {
                                    required: "비밀번호는 필수 입력 항목입니다.",
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                        message: "영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요"
                                    }
                                })}
                            />
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        </div>
                        <div>
                            <button className={buttonClassName} disabled={!isValid} type="submit">
                                로그인하기
                            </button>
                            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
*/

//최근//
/*import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
`;

const Banner = styled.div`
    background-color: #f0f0f0;
    padding: 10px;
    text-align: center;
`;

export default function Login() {
    const { register, formState: { errors, isValid }, handleSubmit } = useForm({
        mode: "onChange"
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("Submitting data: ", data);
        try {
            const response = await axios.post("http://localhost:8080/auth/login", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response.data.token;
            localStorage.setItem('Token', token);
            console.log(response.data);
            alert("로그인에 성공하셨습니다!");
            setLoggedIn(true);
            fetchUserData(token);
            navigate(`/`);
        } catch (error) {
            console.error("Error logging in:", error);
            if (error.response) {
                setErrorMessage(`로그인에 실패했습니다: ${error.response.data.message}`);
            } else {
                setErrorMessage("로그인에 실패했습니다. 네트워크 문제를 확인하세요.");
            }
        }
    };

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get("http://localhost:8080/auth/me", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsername(response.data.name);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            fetchUserData(token);
        }
    }, []);
    const buttonClassName = isValid ? "sub-active" : "sub";
    return (
        <div>
            {loggedIn &&username && <Banner>{username}님 환영합니다.</Banner>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="total1">
                    <div className="login_page">
                        <div className="login_title">
                            로그인 페이지
                        </div>
                        <div className="login_content">
                            <input
                                type='text'
                                className="id"
                                placeholder="아이디를 입력해주세요."
                                {...register('username', {
                                    required: "아이디는 필수입력사항입니다.",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "아이디를 영어로 입력해주세요"
                                    }
                                })}
                            />
                            {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}

                            <input
                                type='password'
                                className="id_pw"
                                placeholder="비밀번호를 입력해주세요."
                                {...register('password', {
                                    required: "비밀번호는 필수 입력 항목입니다.",
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                        message: "영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요"
                                    }
                                })}
                            />
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        </div>
                        <div>
                            <button className={ buttonClassName }disabled={!isValid} type="submit">
                                로그인하기
                            </button>
                            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
*/

/*import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
`;

export default function Login() {
    const { register, formState: { errors, isValid }, handleSubmit } = useForm({
        mode: "onChange"
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async(data) => {
        try{
            const response = await axios.post("http://localhost:8080/auth/login", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response.data.token;
            localStorage.setItem('Token', token);
            console.log(response.data);
            alert("로그인에 성공하셨습니다!");
            navigate(`/`);
        } catch(error){
            console.error("Error logging in:", error);
            setErrorMessage("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
        }
    };

    const buttonClassName = isValid ? "sub-active" : "sub";
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="total1">
                <div className="login_page">
                    <div className="login_title">
                        로그인 페이지
                    </div>
                    <div className="login_content">
                        <input
                            type='text'
                            className="id"
                            placeholder="아이디를 입력해주세요."
                            {...register('username', {
                                required: "아이디는 필수입력사항입니다.",
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: "아이디를 영어로 입력해주세요"
                                }
                            })}
                        />
                        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}

                        <input
                            type='password'
                            className="id_pw"
                            placeholder="비밀번호를 입력해주세요."
                            {...register('password', {
                                required: "비밀번호는 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                    message: "영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요"
                                }
                            })}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </div>
                    <div>
                       <button className={buttonClassName} disabled={!isValid} type="submit">
                            로그인하기
                        </button>
                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    </div>
                </div>
            </div>
        </form>
    );
}
*/

/*import React from "react";
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
`;

export default function Login() {
    const { register, formState: { errors, isValid }, handleSubmit } = useForm({
        mode: "onChange"
    });

    const navigate = useNavigate();
  
    const onSubmit = async(data) => {
        try{
            const response = await axios.post("http://localhost:8080/auth/login", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response.data.token;
            localStorage.setItem('Token', token);
            console.log(response.data);
        } catch(error){
            console.log(error);
        }
        alert("로그인에 성공하셨습니다!");
        navigate(`/`);
    }
    const buttonClassName = isValid ? "sub-active" : "sub";
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="total1">
                <div className="login_page">
                    <div className="login_title">
                        로그인 페이지
                    </div>
                    <div className="login_content">
                        <input
                            type='text'
                            className="id"
                            placeholder="아이디를 입력해주세요."
                            {...register('username', {
                                required: "아이디는 필수입력사항입니다.",
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: "아이디를 입력해주세요"
                                }
                            })}
                        />
                        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}

                        <input
                            type='password'
                            className="id_pw"
                            placeholder="비밀번호"
                            {...register('password', {
                                required: "비밀번호는 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                    message: "영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요"
                                }
                            })}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </div>
                    <div>
                        <button className="login_button" disabled={!isValid} type="submit">
                            로그인하기
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}*/
