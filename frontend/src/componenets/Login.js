import React, {useState} from 'react';
import '../styles/Login.css';
import axios from 'axios';
import LoginAuth from './LoginAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {
    const [username, setUsername] = useState('')
    const [passWord, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')

    const [usernameEmpty, setusernameempty] = useState(false)
    const [passwordEmpty, setpasswordeempty] = useState(false)
    const [nicknameEmpty, setnicknameempty] = useState(false)
    const [emailEmpty, setEmailEmpty] = useState(false)
    
    const [userLogin, setUserLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')

    function logInUser() {
        axios({
            method: 'post',
            url: 'http://localhost:8080/user/logIn',
            data: { username: userLogin, 
                    password:passwordLogin }
        }).then(res => handleLogin(res.data))
          .catch(e => alert(e))
    }
    function toastInfo(message) {
        toast.configure();
        return toast.info(message, {
            position: toast.POSITION.TOP_CENTER
          });
    }
    function handleLogin(data) {
        localStorage.setItem("user", JSON.stringify(data))
        toastInfo('Log in exitoso!')
        setTimeout(() => {props.history.push("/")}, 1000)
    }
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
        toastInfo("Hura! te registraste correctamente")
        setTimeout(() => {props.history.push("/")}, 1000)
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
                <div className={"register-container"} >
                    <input  type="text" 
                            className={"input-login-register"}
                            onChange={(event) => setUserLogin(event.target.value)}
                            placeholder={"Username"} />
                    <input  type="password" 
                            className={"input-login-register"}
                            onChange={(event) =>setPasswordLogin(event.target.value)}
                            placeholder={"Password"} />
                </div>
                <div><button className={"register-button"} 
                             onClick={() => logInUser()}>Enter</button></div>
                
                <LoginAuth></LoginAuth>
            </div>

        </div>
    )
}