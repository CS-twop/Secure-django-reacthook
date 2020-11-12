import './Comment.css';

function Comment() {
    return (
        <div className='comment'>
            <div className='comment-header'>
                <div className='commenter'>
                    Mr.Anderson
                </div>
                <div className='comment-btns'>
                        <input className='edit-comment-btn' type='button' value='EDIT'></input>
                        <input className='delete-comment-btn' type='button' value='DELETE'></input>
                </div>
            </div>  
            <div className='content' >
                <textarea className='comment-box' rows='2' cols='94' readOnly='true'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                </textarea>
            </div>
                
        </div>
    )
}

export default Comment;