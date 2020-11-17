import Post from './Post';
import WritePost from './WritePost';
import './Forum.css';
import React, { useState,useEffect } from 'react';
import axiosInstance from "../axiosApi";
import {useHistory} from "react-router-dom"
import Cookies from 'universal-cookie';

function Forum() {
    const history = useHistory()
    const cookies = new Cookies()
    // const [user, setUser] = useState(localStorage.getItem("username"))
    const [user, setUser] = useState()
    const [role, setRole] = useState()
    const [posts, setPosts] = useState([])

    const onClickSignOut = () => {
        // localStorage.clear()
        // console.log(cookies.get("refresh_token"))
        axiosInstance.post('token/blacklist/',{
            refresh_token: cookies.get("refresh_token")
        }).then(response => {
            if(response.status == "205"){
                cookies.remove("access_token")
                cookies.remove("refresh_token")
                // cookies.remove("username")
                history.push("/signin")
            }
        })
        
    }

    // get posts
    useEffect(() => {
        try{
            axiosInstance.get(`posts/`)
            .then(response => {
                // console.log("post :",response.data)
                setPosts(response.data)
            })
        } catch(error){
            throw error
        }
    },[])

    useEffect(() => {
        try{
            axiosInstance.get(`user/`)
            .then(response => {
                // console.log("setUser")
                setUser(response.data.username)
                setRole(response.data.groups_[0].name)
            })
        } catch(err){
            throw err
        }
    },[])

    // console.log(user,"----",role)

    return (
        <div className='forum-page'>
            <div className='Navbar'>
                <div className='forum-header'>FORUM</div>
                <div className='navbar-btn'>
                    <input className='signout-btn' type='button' value='SIGNOUT'onClick={onClickSignOut} ></input>
                </div>
            </div>
            <div className='forum-posts'>
                <WritePost user={user} />
                {posts.map(post => (<Post user={user} poster={post.user} role={role} content={post.content} comments={post.post_comments} id={post.id} />))}
            </div>
        </div>
    );
}

export default Forum;