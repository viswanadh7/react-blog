import React, { useState } from 'react'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router-dom'
import PostCard from './PostCard'
import { useAuth } from '../utils/auth'

import PulseLoader from "react-spinners/PulseLoader";


// const POST_URL = 'http://localhost:8080/posts'
const POST_URL = 'https://blog-server-ke1e.onrender.com/posts'

function addPost(postData) {
    return axios.post(POST_URL, postData)
}
function Profile() {
    const auth = useAuth()
    if (auth.user === undefined) {
        return (<Navigate to='/login' />)
    }

    //------------Responsive booleans------------//
    const [createPostBoolean, setCreatePostBoolean] = useState(false)
    const [showMyPostBoolean, setShowMyPostBoolean] = useState(true)
    const [profileSideBar, setProfileSideBar] = useState(false)
    const [trendingSideBar, setTrendingSideBar] = useState(false)
    //------------Responsive booleans------------//
    //----------------Date----------------//
    const currentDate = new Date()
    const date = currentDate.getDate()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const fullDateString = `${date}-${month}-${year}`
    console.log(`${date}-${month}-${year}`)
    //----------------Date----------------//
    const params = useParams()
    // const URL = `https://blog-server-ke1e.onrender.com/users/${params.id}`
    const [postData, setPostData] = useState({ userID: params.id, date: fullDateString, topic: 'Automobiles', image_url: '', heading: '', description: '' })

    // const { data: userData } = useQuery({ queryKey: ['userData'], queryFn: () => { return axios.get(URL) } })

    const { data: getPostData, refetch } = useQuery({ queryKey: ['getPostDataKey'], queryFn: () => { return axios.get(POST_URL) } })

    const { mutate: addMutate, isPending } = useMutation({
        mutationFn: () => addPost(postData),
        onSuccess: () => {
            refetch()
            // queryClient.invalidateQueries({ queryKey: ['getPostDataKey'] });
            setPostData({ topic: '', image_url: '', heading: '', description: '' })
            setCreatePostBoolean(false)
            setShowMyPostBoolean(true)
        }
    })
    function handleSubmit(e) {
        e.preventDefault()
        addMutate()
    }
    // console.log(auth.user === undefined)
    return (
        <div className='lg:grid grid-cols-5 gap-5 px-5'>
            <div className={`col-span-1 border border-black p-3 h-fit sticky top-20 bg-white z-50 ${profileSideBar ? '' : 'hidden'} lg:block mt-8 lg:mt-0`}>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" alt="" />
                <h1 className='text-2xl'>{auth?.user.firstname}</h1>
                <p>No.of post - 8</p>

                <button onClick={() => { setCreatePostBoolean(true); setShowMyPostBoolean(false); setProfileSideBar(false) }} className='px-3 py-2 md:py-1 border border-black w-full my-2'>Create new post</button>

                <button onClick={() => { setCreatePostBoolean(false); setShowMyPostBoolean(true); setProfileSideBar(false) }} className='px-3 py-2 md:py-1 border border-black w-full my-2'>Show my posts</button>

                <div className='flex w-full'>
                    <button onClick={() => { navigate('/'); auth.logout(); window.location.reload() }} className='px-3 py-2 md:py-1 border border-black mx-auto w-1/2 my-2 bg-red-500 text-white'>Logout</button>
                </div>
            </div>
            <div className={showMyPostBoolean ? 'col-span-3 flex flex-col gap-5' : 'hidden'}>
                <div className='flex justify-around lg:hidden mt-6'>
                    <button className='border border-black text-lg w-40 py-1' onClick={() => { setProfileSideBar(true); setShowMyPostBoolean(false); setCreatePostBoolean(false) }}>Profile</button>
                    <button className='border border-black text-lg w-40 py-1' onClick={() => { setTrendingSideBar(true); setShowMyPostBoolean(false); setCreatePostBoolean(false) }}>Trending Now</button>
                </div>

                <h1 className='mt-3 flex items-center gap-5'><span className='text-2xl'>Your Posts</span><i className="fa-solid fa-arrow-down-long text-md"></i></h1>
                {getPostData?.data.map((post) => {
                    if (post.userID === auth?.user.id) {
                        return (<PostCard key={post.id} post={post} />)
                    }
                })}
            </div>
            <div className={createPostBoolean ? 'col-span-3 bg-white flex flex-col gap-5 p-5 border border-black mt-6' : 'hidden'}>
                <div className={isPending ? 'mx-auto' : 'hidden'}>
                    <PulseLoader color={'#ff0000'} size={20} aria-label="Loading Spinner" data-testid="loader" />
                    <h1>Please wait...</h1>
                </div>
                <h1 className='mx-auto text-xl'>Post a new blog</h1>
                <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-5' action="">
                    <select onChange={(e) => setPostData({ ...postData, topic: e.target.value })} value={postData.topic} className='py-2 px-3 rounded-lg bg-white border border-black' name="" id="">
                        <option value="Automobiles">Automobiles</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Tech">Tech</option>
                        <option value="Others">Others</option>
                    </select>
                    <input onChange={(e) => setPostData({ ...postData, image_url: e.target.value })} value={postData.image_url} className='border border-black px-3 py-2 rounded-lg' type="text" name="" id="" placeholder='Image URL' />
                    <input onChange={(e) => setPostData({ ...postData, heading: e.target.value })} value={postData.heading} className='border border-black px-3 py-2 rounded-lg' type="text" name="" id="" placeholder='Heading' />
                    <textarea onChange={(e) => setPostData({ ...postData, description: e.target.value })} value={postData.description} className='border border-black px-3 py-2 rounded-lg' rows='10' name="" id="" placeholder='Description'></textarea>
                    <input className='border border-black px-5 py-1 rounded-lg w-fit mx-auto cursor-pointer' type="submit" value="Submit" />
                </form>
                <button onClick={() => { setProfileSideBar(true); setCreatePostBoolean(false) }} className='border border-black w-fit px-4 py-1 md:hidden'>Back</button>
            </div>
            <div className={` flex-col gap-10 col-span-1 text-lg px-5 py-5 border border-black h-fit sticky top-20 mt-8 lg:mt-0 bg-white ${trendingSideBar ? 'flex' : 'hidden lg:flex'}`}>
                <h1 className='text-xl font-semibold'>Trending Now</h1>
                <h1 className='flex justify-between'>Kalki 2898AD<i className="fa-solid fa-arrow-trend-up"></i></h1>
                <h1 className='flex justify-between'>Virat Kohli<i className="fa-solid fa-arrow-trend-up"></i></h1>
                <h1 className='flex justify-between'>Pavan Kalyan<i className="fa-solid fa-arrow-trend-up"></i></h1>
                <h1 className='flex justify-between'>India vs Austrila<i className="fa-solid fa-arrow-trend-up"></i></h1>
                <button onClick={() => { setTrendingSideBar(false); setShowMyPostBoolean(true) }} className='md:hidden'>Back</button>
            </div>
        </div>
    )
}

export default Profile
