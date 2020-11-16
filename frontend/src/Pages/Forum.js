import Post from './Post';
import WritePost from './WritePost';
import './Forum.css';
import React, { useState,useEffect } from 'react';
import axiosInstance from "../axiosApi";
import {useHistory} from "react-router-dom"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {logout} from "../actions/userActions"

function Forum() {
    const history = useHistory()
    const dispatch = useDispatch();
    const [user, setUser] = useState(localStorage.getItem("username"))
    const [posts, setPosts] = useState([])

    const onClickSignOut = () => {
        localStorage.clear()
        dispatch(logout());
        history.push("/signin")
    }

    // get posts
    useEffect(() => {
        try{
            axiosInstance.get(`posts/`)
            .then(response => {
                console.log("post :",response.data)
                setPosts(response.data)
            })
        } catch(error){
            throw error
        }
    },[])

    // console.log("link",posts)

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
                {posts.map(post => (<Post user={user} poster={post.user} content={post.content} comments={post.post_comments} id={post.id} />))}
            </div>
        </div>
    );
}

export default Forum;