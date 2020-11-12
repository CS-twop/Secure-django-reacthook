import './Post.css';
import Comment from './Comment';
import WriteComment from './WriteComment'; 



function Post(props) {

    return (
        <div className='post'>
            <div className='post-header'>
                <div className='poster-detail'>
                    <div className='poster-name'>{props.poster}</div>
                </div>
                <div className='post-btns'>
                    <input className='edit-btn' type='button' value='EDIT'></input>
                    <input className='delete-btn' type='button' value='DELETE'></input>
                </div>
            </div>
            <div className='post-context'>
                <textarea className='post-box' rows='5' cols='95' readOnly='true'>
                   {props.content}
                </textarea>
            </div>
            <div className='line'></div>
            <div className='comment-part'>
                <WriteComment />
                {props.comments.map(comment => (<Comment commenter={comment.commenter} content={comment.content}/>))}
            </div>
            
        </div>
    )
}

export default Post;