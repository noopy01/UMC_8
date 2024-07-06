import React, { useRef } from "react";
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
`;

export default function Sign() {
    const { register, watch, formState: { errors, isValid }, handleSubmit } = useForm({
        mode: "onChange"
    });
    const navigate = useNavigate();

    const password = useRef();
    password.current = watch("password");

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/auth/sign", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            alert("회원가입이 완료되었습니다!");
            navigate(`/login`);
        } catch (error) {
            if (error.response) {
                // 서버가 응답을 반환한 경우
                console.error("Error response:", error.response.data);
                alert(`회원가입에 실패했습니다: ${error.response.data.message}`);
            } else {
                // 다른 오류
                console.error("Error signing up:", error);
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };
    
    const buttonClassName = isValid ? "sub-active" : "sub";

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="total">
                <div className="page">
                    <div className="titleWrap2">
                        회원가입 페이지
                    </div>
                    <div className="contentWrap2">
                        <input type='text'
                            className="name"
                            {...register('name', {
                                required: "이름은 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^[가-힣]+$/,
                                    message: "이름을 한글로 입력해주세요",
                                }
                            })}
                            placeholder="이름을 입력해주세요"
                        />
                        {errors.name && errors.name.type === "required" && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        {errors.name && errors.name.type === "pattern" && <ErrorMessage>{errors.name.message}</ErrorMessage>}

                        <input
                            type='text'
                            className="sign_id"
                            {...register('sign_id', {
                                required: "아이디는 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: "아이디를 영어로 입력해주세요",
                                }
                            })}
                            placeholder="아이디를 입력해주세요"
                        />
                        {errors.sign_id && errors.sign_id.type === "required" && <ErrorMessage>{errors.sign_id.message}</ErrorMessage>}
                        {errors.sign_id && errors.sign_id.type === "pattern" && <ErrorMessage>{errors.sign_id.message}</ErrorMessage>}

                        <input
                            type='email'
                            className="email"
                            placeholder="이메일을 입력해주세요"
                            {...register('email', {
                                required: "이메일은 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "유효한 이메일 주소를 입력해주세요"
                                }
                            })}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                        <input
                            type="text"
                            className="age"
                            placeholder="나이를 입력해주세요"
                            {...register('age', {
                                required: "나이는 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "나이는 0 이상의 정수만 입력해주세요"
                                },
                                min: {
                                    value: 19,
                                    message: "19세 이상만 가입 가능합니다."
                                }
                            })}
                        />
                        {errors.age && errors.age.type === "required" && <ErrorMessage>{errors.age.message}</ErrorMessage>}
                        {errors.age && errors.age.type === "pattern" && <ErrorMessage>{errors.age.message}</ErrorMessage>}
                        {errors.age && errors.age.type === "min" && <ErrorMessage>{errors.age.message}</ErrorMessage>}

                        <input
                            type="password"
                            className="password"
                            placeholder="비밀번호를 입력해주세요"
                            {...register('password', {
                                required: "비밀번호는 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                    message: "영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요"
                                },
                                min: {
                                    value: 4,
                                    message: "비밀번호는 최소 4자리 이상이어야 합니다."
                                },
                                max: {
                                    value: 12,
                                    message: "비밀번호는 최대 12자리까지 가능합니다"
                                }
                            })}
                        />
                        {errors.password && errors.password.type === "required" && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        {errors.password && errors.password.type === "pattern" && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        {errors.password && errors.password.type === "min" && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        {errors.password && errors.password.type === "max" && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                        <input
                            type="password"
                            className="password_confirm"
                            placeholder="비밀번호를 다시 입력해주세요"
                            {...register('password_confirm', {
                                required: "비밀번호 확인은 필수 입력 항목입니다.",
                                validate: (value) =>
                                    value === password.current || "비밀번호가 일치하지 않습니다."
                            })}
                        />
                        {errors.password_confirm && <ErrorMessage>{errors.password_confirm.message}</ErrorMessage>}
                    </div>
                    <div>
                        <button className={buttonClassName} type="submit" disabled={!isValid} onClick={handleSubmit}>
                            제출하기
                        </button>
                    </div>

                    <div className="link_login" style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ margin: '0', marginRight: '8px', marginLeft: '20px' }}>이미 아이디가 있으신가요?</p>
                        <Link to="/login" style={{ color: "white", textDecoration: 'none', marginLeft: '12px', fontSize: '20px' }}> 로그인 페이지로 이동하기</Link>
                    </div>
                </div>
            </div>
        </form>
    );
}



/*import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import styled from 'styled-components';


const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
`;



export default function Sign() {
    
    //코드 유효성 검사하는 코드 (onChange 바뀔때마다 검사함)
    const { register, watch, formState: { errors, isValid }, handleSubmit } = useForm({
        mode: "onChange"
    });

    console.log(watch('name', 'email', 'age', 'password', 'password_confirm'));

    const password = useRef();
    password.current = watch("password");

    const handleClick = () => {
        alert('회원가입이 완료되었습니다!');
    };

    const onSubmit = (data) => {
        console.log('data', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="total">
                <div className="page">
                    <div className="titleWrap2">
                        회원가입 페이지
                    </div>
                    <div className="contentWrap2">
                        <input type='text'
                            className="name"
                            {...register('name', {
                                required: "이름은 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^[가-힣]+$/,
                                    message: "이름을 한글로 입력해주세요",
                                }
                            })}
                            placeholder="이름을 입력해주세요"
                        />
                        {errors.name && errors.name.type === "required" && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        {errors.name && errors.name.type === "pattern" && <ErrorMessage>{errors.name.message}</ErrorMessage>}

                        <input
                            type='text'
                            className="sign_id"
                            {...register('sign_id', {
                                required: "아이디는 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: "아이디를 영어로 입력해주세요",
                                }
                            })}
                            placeholder="아이디를 입력해주세요"
                        />
                        {errors.sign_id && errors.sign_id.type === "required" && <ErrorMessage>{errors.sign_id.message}</ErrorMessage>}
                        {errors.sign_id && errors.sign_id.type === "pattern" && <ErrorMessage>{errors.sign_id.message}</ErrorMessage>}



                        <input
                            type='email'
                            className="email"
                            placeholder="이메일을 입력해주세요"
                            {...register('email', {
                                required: "이메일은 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "유효한 이메일 주소를 입력해주세요"
                                }
                            })}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                        <input
                            type="text"
                            className="age"
                            placeholder="나이를 입력해주세요"
                            {...register('age', {
                                required: "나이는 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "나이는 0 이상의 정수만 입력해주세요"
                                },
                                min: {
                                    value: 19,
                                    message: "19세 이상만 가입 가능합니다."
                                }
                            })}
                        />
                        {errors.age && errors.age.type === "required" && <ErrorMessage>{errors.age.message}</ErrorMessage>}
                        {errors.age && errors.age.type === "pattern" && <ErrorMessage>{errors.age.message}</ErrorMessage>}
                        {errors.age && errors.age.type === "min" && <ErrorMessage>{errors.age.message}</ErrorMessage>}

                        <input
                            type="password"
                            className="password"
                            placeholder="비밀번호를 입력해주세요"
                            {...register('password', {
                                required: "비밀번호는 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                    message: "영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요"
                                },
                                min: {
                                    value: 4,
                                    message: "비밀번호는 최소 4자리 이상이어야 합니다."
                                },
                                max: {
                                    value: 12,
                                    message: "비밀번호는 최대 12자리까지 가능합니다"
                                }
                            })}
                        />
                        {errors.password && errors.password.type === "required" && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        {errors.password && errors.password.type === "pattern" && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        {errors.password && errors.password.type === "min" && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        {errors.password && errors.password.type === "max" && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                        <input
                            type="password"
                            className="password_confirm"
                            placeholder="비밀번호를 다시 입력해주세요"
                            {...register('password_confirm', {
                                required: "비밀번호 확인은 필수 입력 항목입니다.",
                                validate: (value) =>
                                    value === password.current || "비밀번호가 일치하지 않습니다."
                            })}
                        />
                        {errors.password_confirm && <ErrorMessage>{errors.password_confirm.message}</ErrorMessage>}
                    </div>
                    <div>
                    {/*  */
         /*             <Link to ="/login" style={{ textDecoration: 'none' } } onClick={handleClick}  >
                            <button className="button2" type="submit" disabled={!isValid} onClick={handleSubmit}  >
                                제출하기
                            </button>
                        </Link>
                    </div>

                    <div className="link_login" style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ margin: '0', marginRight: '8px',marginLeft: '20px' }}>이미 아이디가 있으신가요?</p>
                        <Link to ="/login" style={{color: "white", textDecoration: 'none' ,marginLeft: '12px',fontSize:'20px'} }> 로그인 페이지로 이동하기</Link>
                    </div>
                </div>
            </div>
        </form>
    );
} */