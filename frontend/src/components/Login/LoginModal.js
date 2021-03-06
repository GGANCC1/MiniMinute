import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import url from '../../api/axios';


//로그인 모달 창
export default function LoginModal(props) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const [check, setCheck] = useState(true);
    const [accessToken,setaccessToken] = useState('');

    const handleClose = () => {setShow(false); setErrormsg('');
        if(!check){setEmail('');}  setPassword('');}
    
    const handleShow = () => setShow(true);
    


    //로그인 버튼 누를 때 서버에 정보 전달
    const onSubmit = (event) => {
        event.preventDefault();
        url.post(
            "/rest-auth/login",{
                "email" : email,
                "password" : password
            }
        )
            .then((response) => {
                console.log(response);
                props.userHasAuthenticated(true, response.data.user, response.data.token);  //인증확인, 토큰 발급
                handleClose();

            })
            .catch((error) => {
                console.log(error.response);
                setErrormsg("※ 이메일 또는 비밀번호를 확인하세요 ※"); //에러 메시지
            });
    }



    return (
        <>
            <Button className="nextButton" id="Login-Button" onClick={handleShow}>
                {props.title}
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <div className="login-form">
                    <Modal.Header closeButton>
                        <Modal.Title>로그인</Modal.Title>
                    </Modal.Header>

                    <form onSubmit={onSubmit}>
                        <div className="Errormsg">{errormsg}</div>
                        <div><input type="email" name="email"  placeholder="이메일" value={email} onChange={(e)=>setEmail(e.currentTarget.value)} className="login-text"/></div>
                        <div><input type="password" name="password"  placeholder="비밀번호" value={password} onChange={(e)=>setPassword(e.currentTarget.value)}className="login-text"/></div>
                        {/* <div className="remember-email"><input type="checkbox" onChange={onClick} checked/>이메일 기억하기</div> */}
                        <button type="submit"  onSubmit={onSubmit} className="submit-btn" >로그인</button>
                    </form>
                </div>
            </Modal>
        </>
    );
}

