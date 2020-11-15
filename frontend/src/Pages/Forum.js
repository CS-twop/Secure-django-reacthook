import Post from './Post';
import WritePost from './WritePost';
import './Forum.css';
import React, { useState } from 'react';
import axiosInstance from "../axiosApi";


function Forum() {
    const [user, setUser] = useState('Morpheus')
    const [posts, setPosts] = useState(
        [
            { 
                'poster': 'Morpheus',
                'content': ' Lorem ipsum doculis et. Sed id eros cursus, ultricies libero ut, tempus neque. Nunc in mauris sit amet sapien interdum rhoncus non ut felis. Phasellus ac placerat ligula. Morbi eget aliquet nibh. Aliquam eleifend finibus mi, quis suscipit odio hendrerit ac. Quisque lobortis semper quam quis porttitor.hendrerit ac. Quisque lobortis semper quam quis porttitor.',
                'comments': [{
                        'commenter': 'Agent_O',
                        'content': ' Lorem ipsum doculis et. Sed id eros cursus, ultricies libero ut, tempus neque. Nunc in mauris sit amet sapien interdum rhoncus non ut felis. Phasellus ac placerat ligula. Morbi eget aliquet nibh. Aliquam eleifend finibus mi, quis suscipit odio hendrerit ac. Quisque lobortis semper quam quis porttitor.hendrerit ac. Quisque lobortis semper quam quis porttitor.'
                    },
                    {
                        'commenter': 'Key_master',
                        'content': ' Lorem ipsum doculis et. Sed id eros cursus, ultricies libero ut, tempus neque. Nunc in mauris sit amet sapien interdum rhoncus non ut felis. Phasellus ac placerat ligula. Morbi eget aliquet nibh. Aliquam eleifend finibus mi, quis suscipit odio hendrerit ac. Quisque lobortis semper quam quis porttitor.hendrerit ac. Quisque lobortis semper quam quis porttitor.'
                    }]
            },
            { 
                'poster': 'Neo',
                'content': ' Lorem ipsum doculis et. Sed id eros cursus, ultricies libero ut, tempus neque. Nunc in mauris sit amet sapien interdum rhoncus non ut felis. Phasellus ac placerat ligula. Morbi eget aliquet nibh. Aliquam eleifend finibus mi, quis suscipit odio hendrerit ac. Quisque lobortis semper quam quis porttitor.hendrerit ac. Quisque lobortis semper quam quis porttitor.',
                'comments': [{
                        'commenter': 'Smith',
                        'content': ' Lorem ipsum doculis et. Sed id eros cursus, ultricies libero ut, tempus neque. Nunc in mauris sit amet sapien interdum rhoncus non ut felis. Phasellus ac placerat ligula. Morbi eget aliquet nibh. Aliquam eleifend finibus mi, quis suscipit odio hendrerit ac. Quisque lobortis semper quam quis porttitor.hendrerit ac. Quisque lobortis semper quam quis porttitor.'
                    },
                    {
                        'commenter': 'Trinity',
                        'content': ' Lorem ipsum doculis et. Sed id eros cursus, ultricies libero ut, tempus neque. Nunc in mauris sit amet sapien interdum rhoncus non ut felis. Phasellus ac placerat ligula. Morbi eget aliquet nibh. Aliquam eleifend finibus mi, quis suscipit odio hendrerit ac. Quisque lobortis semper quam quis porttitor.hendrerit ac. Quisque lobortis semper quam quis porttitor.'
                    }]
            },
            { 
                'poster': 'Trinity',
                'content': ' Lorem ipsum doculis et. Sed id eros cursus, ultricies libero ut, tempus neque. Nunc in mauris sit amet sapien interdum rhoncus non ut felis. Phasellus ac placerat ligula. Morbi eget aliquet nibh. Aliquam eleifend finibus mi, quis suscipit odio hendrerit ac. Quisque lobortis semper quam quis porttitor.hendrerit ac. Quisque lobortis semper quam quis porttitor.',
                'comments': [{
                        'commenter': 'Neo',
                        'content': ' Lorem ipsum doculis et. Sed id eros cursus, ultricies libero ut, tempus neque. Nunc in mauris sit amet sapien interdum rhoncus non ut felis. Phasellus ac placerat ligula. Morbi eget aliquet nibh. Aliquam eleifend finibus mi, quis suscipit odio hendrerit ac. Quisque lobortis semper quam quis porttitor.hendrerit ac. Quisque lobortis semper quam quis porttitor.'
                    },
                    {
                        'commenter': 'Morpheus',
                        'content': ' Lorem ipsum doculis et. Sed id eros cursus, ultricies libero ut, tempus neque. Nunc in mauris sit amet sapien interdum rhoncus non ut felis. Phasellus ac placerat ligula. Morbi eget aliquet nibh. Aliquam eleifend finibus mi, quis suscipit odio hendrerit ac. Quisque lobortis semper quam quis porttitor.hendrerit ac. Quisque lobortis semper quam quis porttitor.'
                    }]
            }
        ]
    )

    //get post
    // useEffect(() => {
    //     try{
    //         axiosInstance.get(`post`)
    //         .then(response => {
    //            setPosts(response.data)
    //         })
    //     } catch(error){
    //         throw error
    //     }
    // },[])


    return (
        <div className='forum-page'>
            <div className='Navbar'>
                <div className='forum-header'>FORUM</div>
                <div className='navbar-btn'>
                    <input className='signout-btn' type='button' value='SIGNOUT'></input>
                </div>
            </div>
            <div className='forum-posts'>
                <WritePost user={user}/>
                {posts.map(post => (<Post user={user} poster={post.poster} content={post.content} comments={post.comments}/>))}
            </div>
        </div>
    );
}

export default Forum;