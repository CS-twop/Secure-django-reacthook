import './Signin.css';
import React,{useState} from "react";
import axiosInstance from "../axiosApi";
import axios from "axios"


function Signin () {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    console.log("access_token :",localStorage.getItem('access_token'))

    const handleSubmit = () => {
        try{
            axiosInstance.post(`token/obtain/`,
            {
                username: username,
                password: password,
            }
            ).then(response=>{
                console.log(response.data)
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
            })
            
        } catch(error){
            throw error
        }
    }
    return (
        <div className='page'>
            <button onClick={handleSubmit}>lfsjdl</button>
            <div className='signin-box'>
                <form onSubmit={handleSubmit}>
                    <div className='signin-header'>web/signin.</div>
                    <div className='signin-subbox' id='usrn'>
                        <label className='label'>Username:</label>
                        <input
                            autoComplete='off'
                            className='input-authen'
                            type='text'
                            value = {username}
                            onChange = {(e)=> setUsername(e.target.value)}
                            placeholder='Put your nice username'
                            required
                        />
                    </div>
                    <div className='signin-subbox' id='pwd'>
                        <label className='label'>Password:</label>
                        <input
                            className='input-authen'
                            type='password'
                            value = {password}
                            onChange = {(e)=> setPassword(e.target.value)}
                            placeholder='Put your secure password'
                            required
                        />
                    </div>
                    <div className='signin-btn-subbox'>
                        <input className='signin-btn' type='submit'  value='sign in' />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;