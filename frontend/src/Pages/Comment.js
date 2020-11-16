import './Comment.css';
import React, { useState , useEffect } from 'react';
import {useHistory} from "react-router-dom"
import axiosInstance from '../axiosApi';

function Comment(props) {
    const [checkUser,setCheckUser] = useState(false)
    const [checkEdit,setCheckEdit] = useState(false)
    const [content,setContent] = useState(props.content)

    useEffect(() => {
        if(props.user === props.commenter)
            setCheckUser(true)
        else
            setCheckUser(false)
    },[props.user, props.commenter])

    function handleEdit(){
        setCheckEdit(true)
    }

    function handleDone(){
        setCheckEdit(false)
        axiosInstance.patch('comment/update/',
        {   
            post_id: props.id,
            content: content,
            comment_id: props.comment_id
        }).then(response => {
            window.location.reload()
        })
    }

    function handleDelete(){
        axiosInstance.delete('comment/delete/',
        {data:  {
                    comment_id: props.comment_id
                }
        }).then(response => {
            window.location.reload()
        })
    }


    return (
        <div className='comment'>
            <div className='comment-header'>
                <div className='commenter'>
                    {props.commenter}
                </div>
                <div className='comment-btns'>
                        {(checkUser && !checkEdit) ? <input className='edit-comment-btn' type='button' value='EDIT' onClick={handleEdit}></input>:null}
                        {(checkUser && checkEdit) ? <input className='done-comment-btn' type='button' value='DONE' onClick={handleDone}></input>:null}
                        {checkUser ? <input className='delete-comment-btn' type='button' value='DELETE' onClick={handleDelete}></input>:null}
                </div>
            </div>  
            <div className='content' >
                {!checkEdit ? <textarea className='comment-box' rows='2' readOnly='true'>{props.content}</textarea> :null}
                {(checkUser && checkEdit) ? <textarea className='edit-comment-box' rows='2'value={content} onChange={(e) => setContent(e.target.value)}></textarea>:null}
            </div>
                
        </div>
    )
}

export default Comment;