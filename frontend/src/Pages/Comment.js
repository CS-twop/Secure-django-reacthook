import './Comment.css';

function Comment(props) {
    return (
        <div className='comment'>
            <div className='comment-header'>
                <div className='commenter'>
                    {props.commenter}
                </div>
                <div className='comment-btns'>
                        <input className='edit-comment-btn' type='button' value='EDIT'></input>
                        <input className='delete-comment-btn' type='button' value='DELETE'></input>
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