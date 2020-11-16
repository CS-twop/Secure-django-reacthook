import './Post.css';
import Comment from './Comment';
import WriteComment from './WriteComment'; 
import React, { useState , useEffect } from 'react';
import axiosInstance from "../axiosApi";



function Post(props) {
    const [checkUser,setCheckUser] = useState(false)
    const [checkEdit,setCheckEdit] = useState(false)
    const [content,setContent] = useState(props.content)

    useEffect(() => {
        if(props.user === props.poster)
            setCheckUser(true)
        else
            setCheckUser(false)
    },[props.user, props.poster])


    function handleEdit(){
        setCheckEdit(true)
    }

    function handleDone(){
        setCheckEdit(false)
        axiosInstance.patch('post/update/',
        {
            content:content,
            post_id: props.id
        }).then(response => {
            window.location.reload()
        })
        // console.log(content)
    }

    function handleDelete(){
        console.log(props.id)
        axiosInstance.delete('post/delete/',
        {
            post_id: props.id,
        }).then(response => {
            console.log("delete")
            // window.location.reload()
        })
    }

    return (
        <div className='post'>
            <div className='post-header'>
                <div className='poster-detail'>
                    <div className='poster-name'>{props.poster}</div>
                </div>
                <div className='post-btns'>
                    {(checkUser && !checkEdit) ? <input className='edit-btn' type='button' value='EDIT' onClick={handleEdit}></input>: null}
                    {(checkUser && checkEdit) ? <input className='done-btn' type='button' value='DONE' onClick={handleDone}></input>: null}
                    {checkUser ? <input className='delete-btn' type='button' value='DELETE' onClick={handleDelete}></input>: null}
                </div>
            </div>
            <div className='post-context'>
                {!checkEdit ? <textarea className='post-box' rows='5' readOnly='true'>{props.content}</textarea>:null}
                {(checkUser && checkEdit) ? <textarea className='edit-box' rows='5' value={content} onChange={(e) => setContent(e.target.value)}></textarea>:null}
            </div>
            <div className='line'></div>
            <div className='comment-part'>
                <WriteComment user={props.user} id={props.id}/>
                {props.comments.length !== "0" ? props.comments.map(comment => (<Comment user={props.user} commenter={comment.user} content={comment.content}/>)) : null}
            </div>
        </div>
    )
}

export default Post;