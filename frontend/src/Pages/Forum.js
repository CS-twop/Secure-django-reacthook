import Post from './Post';
import WritePost from './WritePost';
import './Forum.css';

function Forum() {
    return (
        <div className='forum-page'>
            <div className='Navbar'>
                <div className='forum-header'>FORUM</div>
                <div className='navbar-btn'>
                    <input className='signout-btn' type='button' value='SIGNOUT'></input>
                </div>
            </div>
            <div className='forum-posts'>
                <WritePost />
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