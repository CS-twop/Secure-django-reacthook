import Post from './Post';
import './Forum.css';

function Forum() {
    return (
        <div className='forum-page'>
            <div className='forum-posts'>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    );
}

export default Forum;