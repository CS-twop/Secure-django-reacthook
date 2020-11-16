import './Post.css';
import Comment from './Comment';
import WriteComment from './WriteComment'; 
import React, { useState , useEffect } from 'react';



function Post(props) {
    const [checkUser,setCheckUser] = useState(false)
    const [checkEdit,setCheckEdit] = useState(false)

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
                    {checkUser ? <input className='delete-btn' type='button' value='DELETE'></input>: null}
                </div>
            </div>
            <div className='post-context'>
                {!checkEdit ? <textarea className='post-box' rows='5' readOnly='true'>{props.content}</textarea>:null}
                {(checkUser && checkEdit) ? <textarea className='edit-box' rows='5'>{props.content}</textarea>:null}
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