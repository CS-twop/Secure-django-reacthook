import './WritePost.css';
import axiosInstance from "../axiosApi";
import React,{ useState } from 'react';

function WritePost(props) {
    const [post,setPost] = useState("")

    const onClickPost = () => {
        alert(post)    
        try{
            axiosInstance.post(`post/create/`,
            {
                content: post
            }
            )
                .then(response => {
                    console.log(response.data)
                })
        }catch (error){
            throw error
        }
    }

    return (
        <div className='write-post'>
            <div className='write-post-header'>
                <div className='write-post-detail'>
                    <div className='writer'>{props.user}</div>
                </div>
                <div className='write-post-btns'>
                    <input className='post-btn' type='button' onClick={onClickPost} value="post"></input>
                </div>
            </div>
            <div className='write-post-context'>
                <textarea className='write-post-box' rows='5' cols='95' value={post} onChange={(e) => setPost(e.target.value)}></textarea>
            </div>
        </div>
    )
}

export default WritePost;