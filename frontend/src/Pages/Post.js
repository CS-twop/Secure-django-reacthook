import './Post.css';
import Comment from './Comment';

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis suscipit arcu, vitae maximus lacus iaculis et. Sed id eros cursus, ultricies libero ut, tempus neque. Nunc in mauris sit amet sapien interdum rhoncus non ut felis. Phasellus ac placerat ligula. Morbi eget aliquet nibh. Aliquam eleifend finibus mi, quis suscipit odio hendrerit ac. Quisque lobortis semper quam quis porttitor.hendrerit ac. Quisque lobortis semper quam quis porttitor.
            </div>
            <div className='line'></div>
            <div className='comment-part'>
                <Comment />
                <Comment />
            </div>
            
        </div>
    )
}

export default Post;