import './WritePost.css';

function WritePost(props) {
    return (
        <div className='write-post'>
            <div className='write-post-header'>
                <div className='write-post-detail'>
                    <div className='writer'>{props.user}</div>
                </div>
                <div className='write-post-btns'>
                    <input className='post-btn' type='button' value='POST'></input>
                </div>
            </div>
            <div className='write-post-context'>
                <textarea className='write-post-box' rows='5' cols='95' ></textarea>
            </div>
        </div>
    )
}

export default WritePost;