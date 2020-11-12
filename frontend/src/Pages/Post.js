import './Post.css';
import Comment from './Comment';
import WriteComment from './WriteComment'; 

function Post() {
    return (
        <div className='post'>
            <div className='post-header'>
                <div className='poster-detail'>
                    <div className='poster-name'>Neo</div>
                </div>
                <div className='post-btns'>
                    <input className='edit-btn' type='button' value='EDIT'></input>
                    <input className='delete-btn' type='button' value='DELETE'></input>
                </div>
            </div>
            <div className='post-context'>
                <textarea className='post-box' rows='5' cols='95' readOnly='true'>
                    Lorem ipsum doculis et. Sed id eros cursus, ultricies libero ut, tempus neque. Nunc in mauris sit amet sapien interdum rhoncus non ut felis. Phasellus ac placerat ligula. Morbi eget aliquet nibh. Aliquam eleifend finibus mi, quis suscipit odio hendrerit ac. Quisque lobortis semper quam quis porttitor.hendrerit ac. Quisque lobortis semper quam quis porttitor.
                </textarea>
            </div>
            <div className='line'></div>
            <div className='comment-part'>
                <WriteComment />
                <Comment />
                <Comment />
            </div>
            
        </div>
    )
}

export default Post;