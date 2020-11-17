import './WriteComment.css';
import React, { useState , useEffect } from 'react';
import axiosInstance from "../axiosApi";
import {useHistory} from "react-router-dom"


function WriteComment(props) {
    const [comment,setComment] = useState("")
    const {id} = props
    const history = useHistory();

    const onClickComment = () => {
        try{
            axiosInstance.post(`comment/create/`,{
                content:comment,
                post_id:id
            }).then(response=>{
                // console.log(response.data)
                window.location.reload()
            })
        }catch(error){
            throw error
        }
    }
    // console.log(comment)
    return (
        <div className='write-comment'>
            <div className='write-comment-header'>
                <div className='write-commenter'>
                    {props.user}
                </div>
                <div className='write-comment-btns'>
                        <input className='post-comment-btn' type='button' value='POST' onClick={onClickComment} ></input>
                </div>
            </div>  
            <div className='content' >
                <textarea className='write-comment-box' rows='3' value={comment} onChange={(e)=>setComment(e.target.value)} ></textarea>
            </div>
        </div>
    )
}

export default WriteComment;