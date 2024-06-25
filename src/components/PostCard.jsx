import React, { useState, useEffect } from 'react'
import axios from 'axios'



function PostCard({ post }) {
    const [user, setUser] = useState()
    useEffect(() => {
        axios.get(`https://blog-server-ke1e.onrender.com/users/${post.userID}`).then(response => setUser(response.data))
    })
    return (
        <div id='postCard' className='h-fit border border-black shadow-lg p-5 mb-5 bg-white'>
            <div className='flex items-center gap-3'>
                <img className='h-16 w-16' src={user && user.profile_url} alt="" />
                <div>
                    <p>{user && user.firstname}</p>
                    <p className='text-sm font-thin'>23-6-2024</p>
                </div>
            </div>
            <div className='my-3'>
                <img className='w-full h-full rounded-lg' src={post.image_url} alt="" />
            </div>
            <div className=''>
                <h1 className='text-xl underline'>{post.heading}</h1>
                <p className='text-lg'>{post.description}</p>
            </div>
        </div>
    )
}

export default PostCard
