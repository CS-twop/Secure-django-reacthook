import './WriteComment.css';

function WriteComment(props) {
    return (
        <div className='write-comment'>
            <div className='write-comment-header'>
                <div className='write-commenter'>
                    {props.user}
                </div>
                <div className='write-comment-btns'>
                        <input className='post-comment-btn' type='button' value='POST'></input>
                </div>
            </div>  
            <div className='content' >
                <textarea className='write-comment-box' rows='3'></textarea>
            </div>
                
        </div>
    )
}

export default WriteComment;