import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../utils/auth'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Helmet, HelmetProvider } from 'react-helmet-async';


function PostCard({ post }) {
    const auth = useAuth()
    const [user, setUser] = useState()
    useEffect(() => {
        axios.get(`https://blog-express-owat.onrender.com/users/${post.userID}`).then(response => setUser(response.data)).catch(error => console.log(error.message))
        // axios.get(`http://localhost:8080/users/${post.userID}`).then(response => setUser(response.data)).catch(error => console.log(error.message))
    }, [''])
    function deletePost() {
        axios.delete(`https://blog-express-owat.onrender.com/posts/${post._id}`)
        // axios.delete(`http://localhost:8080/posts/${post._id}`)
    }
    const { mutate: deleteMutate } = useMutation({
        mutationFn: () => deletePost(),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['getPostDataKey'] }) }
    })
    return (
        <div id='postCard' className='h-fit border border-black shadow-lg p-5 mb-5 bg-white'>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{post.heading}</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
            </HelmetProvider>

            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <img className='h-16 w-16' src={user && user.profile_url} alt="" />
                    <div>
                        <p>{user && user.firstname}</p>
                        <p className='text-sm font-thin'>{post.date}</p>
                    </div>
                </div>
                <div className={auth.user !== undefined ? 'flex items-center group relative' : 'hidden'}>
                    <i className="fa-solid fa-ellipsis text-3xl"></i>
                    <div className='bg-white border border-black rounded-md z-50 top-12 right-0 absolute hidden group-hover:block shadow-black shadow-lg'>
                        <p className='px-6 py-2 hover:scale-110 duration-200 hover:text-blue-500 cursor-pointer'>Save</p>
                        <p className={auth.user && auth.user.id === post.userID ? 'px-6 py-2 hover:scale-110 duration-200 hover:text-red-500 cursor-pointer' : 'hidden'}>Edit</p>
                        <p onClick={() => deleteMutate()} className={auth.user && auth.user.id === post.userID ? 'px-6 py-2 hover:scale-110 duration-200 hover:text-red-500 cursor-pointer' : 'hidden'}>Delete</p>
                    </div>
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
