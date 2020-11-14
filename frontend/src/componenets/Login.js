import React, {useState} from 'react';
import '../styles/Login.css';
import axios from 'axios';
import LoginAuth from './LoginAuth';
import LogOutAuth from './LogOutAuth';

export default function Login(props) {
    const [username, setUsername] = useState('')
    const [passWord, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')

    const [usernameEmpty, setusernameempty] = useState(false)
    const [passwordEmpty, setpasswordeempty] = useState(false)
    const [nicknameEmpty, setnicknameempty] = useState(false)
    const [emailEmpty, setEmailEmpty] = useState(false)
    
    function checkRegister() {
        if(username === '' || 
           passWord === '' || 
           nickname === '' || 
           email === '') {
              if(username === '') {
                 setusernameempty(true)
              }
              if(passWord === '') {
                  setpasswordeempty(true)
              }  
              if(nickname === '') {
                  setnicknameempty(true)
              }
              if(email === '') {
                setEmailEmpty(true)
              }
           } else {
                axios({
                    method: 'post',
                    url: 'http://localhost:8080/user/create',
                    data:  {
                        "userName": username,
                        "email": email,
                        "password": passWord,
                        "nickName": nickname
                    }
                }).then(res =>handleRes(res.data))
                  .catch(e => alert(e.request.response))
           }
    }
    function handleRes(data) {
        let userString = JSON.stringify(data)
        localStorage.setItem("user", userString)
        alert("Hura! te registraste correctamente")
        props.history.push("/")
        
    }
    function updateUsername(event) {
        setUsername(event.target.value)
        setusernameempty(false)
    }
    function updatePassword(event) {
        setPassword(event.target.value)
        setpasswordeempty(false)
    }

    function updateNickName(event) { 
        setNickname(event.target.value)
        setnicknameempty(false)
    }
    function updateEmail(event) {
        setEmail(event.target.value)
        setEmailEmpty(false)
    }

    return(
        <div className={"log-in-container"}>
            <div className={"register-container"}>
                <div className={"inicia-secion-login"}>Registrarse</div>
                <input  type={"text"} 
                        placeholder={"Username"}
                        className={usernameEmpty ? "empty-input" : "input-login-register"}
                        onChange={(event) => updateUsername(event)} />
                <input  type={"password"} 
                        placeholder={"Password"}
                        className={passwordEmpty ? "empty-input" : "input-login-register"}
                        onChange={(event) => updatePassword(event)} />
                <input  type={"text"} 
                        placeholder={"Email"}
                        className={emailEmpty ? "empty-input" : "input-login-register"}
                        onChange={(event) => updateEmail(event)} />
                <input  type={"text"} 
                        placeholder={"Nickname"}
                        className={nicknameEmpty ? "empty-input" : "input-login-register"}
                        onChange={(event) => updateNickName(event)} />

                <button className={"register-button"}
                        onClick={() => checkRegister()}>Register</button>
            </div>
            <div>
                <div className={"inicia-secion-login"}>Iniciar sesión</div>
                <LoginAuth></LoginAuth>
                <LogOutAuth />
            </div>

        </div>
    )
}