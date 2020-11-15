import './Signin.css';
import React,{useState} from "react";
import axiosInstance from "../axiosApi";


function Signin () {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = () => {
        // console.log(username)
        // console.log(password)
        alert("dfsdf")
        let json = {
            "username": username,
            "password": password
        }
        console.log(json)
        try{
            axiosInstance.post(`token/obtain`,json)
            .then(response => {
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
            <div className='signin-box'>
                <form onSubmit={handleSubmit}>
                    <div className='signin-header'>web/signin.</div>
                    <div className='signin-subbox' id='usrn'>
                        <label className='label'>Username:</label>
                        <input
                            autocomplete='off'
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