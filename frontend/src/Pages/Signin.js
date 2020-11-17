import './Signin.css';
import React, { useState } from "react";
import axiosInstance from "../axiosApi";
import Cookies from 'universal-cookie';
import {useHistory} from "react-router-dom"
import { useDispatch } from "react-redux";
import {loginSuccess} from "../actions/userActions"

function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const history = useHistory()
    const cookies = new Cookies();
    // console.log("access_token :", localStorage.getItem('access_token'))

    // var xss = require("xss")

    const handleClickSummit = () => {
        try {
            axiosInstance.post(`token/obtain/`,
                {
                    username: username,
                    password: password,
                }
            )
            .then(response => {
                // console.log(response)
                if(response.status == "200"){
                    axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                    // localStorage.setItem('access_token', response.data.access);
                    // localStorage.setItem('refresh_token', response.data.refresh);
                    // localStorage.setItem('username', username);
                    cookies.set('access_token', response.data.access)
                    cookies.set('refresh_token', response.data.refresh)
                    // cookies.set('username', username)
                    dispatch(loginSuccess({user:username}));
                    history.push("/forum")
                }
                return response
            })
            .catch((err)=>{
                console.log(err)
                if(err.response.status === 401){
                    // console.log("err")
                    alert("your password is wrong")
                    return;
                }
            })
        } catch (error) {
            // if(error.status === "401")alert("your password is wrong")
            throw error
        }
    }
    return (
        <div className='page'>
            <div className='signin-box'>
                <div className='signin-header'>web/signin.</div>
                <div className='signin-subbox' id='usrn'>
                    <label className='label'>Username:</label>
                    <input
                        autoComplete='off'
                        className='input-authen'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Put your nice username'
                        required
                    />
                </div>
                <div className='signin-subbox' id='pwd'>
                    <label className='label'>Password:</label>
                    <input
                        className='input-authen'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Put your secure password'
                        required
                    />
                </div>
                <div className='signin-btn-subbox'>
                    <button className='signin-btn' onClick={handleClickSummit}>sign in</button>
                </div>
            </div>
        </div>
    );
}

export default Signin;