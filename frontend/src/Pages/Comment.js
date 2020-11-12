import './Comment.css';
import React, { useState , useEffect } from 'react';

function Comment(props) {
    const [checkUser,setCheckUser] = useState(false)
    const [checkEdit,setCheckEdit] = useState(false)

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
                        {checkUser ? <input className='delete-comment-btn' type='button' value='DELETE'></input>:null}
                </div>
            </div>  
            <div className='content' >
                <textarea className='comment-box' rows='2' cols='94' readOnly='true'>
                    {props.content}
                </textarea>
            </div>
                
        </div>
    )
}

export default Comment;