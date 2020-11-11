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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis suscipit arcu, vitae maLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis suscipit arcu, vitae maLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis suscipit arcu, vitae maLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis suscipit arcu, vitae ma
            </div>
                
        </div>
    )
}

export default Comment;