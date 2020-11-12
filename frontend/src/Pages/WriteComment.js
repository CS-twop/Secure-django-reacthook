import './WriteComment.css';

function WriteComment() {
    return (
        <div className='write-comment'>
            <div className='write-comment-header'>
                <div className='write-commenter'>
                    Morpheus
                </div>
                <div className='write-comment-btns'>
                        <input className='post-comment-btn' type='button' value='POST'></input>
                </div>
            </div>  
            <div className='content' >
                <textarea className='write-comment-box' rows='3' cols='94' ></textarea>
            </div>
                
        </div>
    )
}

export default WriteComment;