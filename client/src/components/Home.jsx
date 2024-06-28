import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import PostCard from './PostCard.jsx'

// const POST_URL = 'http://localhost:8080/posts'
const POST_URL = 'https://blog-express-owat.onrender.com/posts'
//https://blog-express-owat.onrender.com
function getAllPosts() {
    return axios.get(POST_URL)
}
function Home() {
    const [topic, setTopic] = useState(null)
    const { data } = useQuery({ queryKey: ['allPosts'], queryFn: () => getAllPosts() })
    // sessionStorage.clear()
    return (
        <div className='lg:grid grid-cols-5 gap-5 px-5'>
            <div className='lg:flex flex-col gap-10 hidden col-span-1 text-lg px-5 py-5 border border-black h-fit sticky top-20 bg-white'>

                <h1 onClick={() => setTopic(null)} className={`cursor-pointer flex items-center justify-between ${topic === null ? 'text-purple-600 font-semibold text-xl' : ''}`}>All posts<i className="fa-solid fa-arrow-right"></i></h1>

                <h1 onClick={() => setTopic('Automobiles')} className={`cursor-pointer flex items-center justify-between ${topic === 'Automobiles' ? 'text-purple-600 font-semibold text-xl' : ''}`}>Automobiles<i className="fa-solid fa-arrow-right"></i></h1>

                <h1 onClick={() => setTopic('Entertainment')} className={`cursor-pointer flex items-center justify-between ${topic === 'Entertainment' ? 'text-purple-600 font-semibold text-xl' : ''}`}>Entertainment<i className="fa-solid fa-arrow-right"></i></h1>

                <h1 onClick={() => setTopic('Tech')} className={`cursor-pointer flex items-center justify-between ${topic === 'Tech' ? 'text-purple-600 font-semibold text-xl' : ''}`}>Tech<i className="fa-solid fa-arrow-right"></i></h1>

                <h1 onClick={() => setTopic('Others')} className={`cursor-pointer flex items-center justify-between ${topic === 'Others' ? 'text-purple-600 font-semibold text-xl' : ''}`}>Others<i className="fa-solid fa-arrow-right"></i></h1>

            </div>
            <div className='col-span-3'>
                <select className='bg-white w-full md:w-1/2 pl-5 py-2 mt-10 mb-2 lg:hidden' onChange={(e) => { e.target.value !== 'All' ? setTopic(e.target.value) : setTopic(null) }} name="" id="">
                    <option value="All">All</option>
                    <option value="Automobiles">Automobiles</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Tech">Tech</option>
                    <option value="Others">Others</option>
                </select>
                <h1 className='text-2xl mt-10 hidden lg:block'>{topic === null ? 'All posts' : topic}</h1>

                {data?.data.reverse().map((post) => {
                    // console.log(post.heading)
                    if (topic !== null) {
                        // console.log(topic)
                        if (topic === post.topic) {
                            // console.log(post.heading)
                            return (<PostCard key={post.id} post={post} />)
                        }
                    }
                    else {
                        return (<PostCard key={post.id} post={post} />)
                    }
                })}

                {/* <div id='postCard' className='h-fit border border-black shadow-lg p-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-16 w-16' src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" alt="" />
                        <div>
                            <p>User Name</p>
                            <p className='text-sm font-thin'>23-6-2024</p>
                        </div>
                    </div>
                    <div className='my-3'>
                        <img className='w-full h-full rounded-lg' src="https://images.pexels.com/photos/18321507/pexels-photo-18321507/free-photo-of-vintage-ford-mustang.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                    </div>
                    <div className=''>
                        <h1 className='text-xl underline'>Ford Mustang 1967 model sold for 2.8cr</h1>
                        <p className='text-lg'>The iconic 1967 Ford Mustang, a timeless symbol of American muscle, recently fetched an impressive 2.8 crore in a collector's auction. Renowned for its powerful V8 engine and sleek design, this vintage masterpiece continues to captivate enthusiasts worldwide. Its enduring popularity highlights its status as a coveted classic car, blending performance and style effortlessly.</p>
                    </div>
                </div> */}
            </div>
            <div className='lg:flex flex-col gap-10 hidden col-span-1 text-lg px-5 py-5 h-fit sticky top-20 border border-black bg-white'>
                <h1 className='text-xl font-semibold'>Trending Now</h1>
                <h1 className='flex justify-between'>Kalki 2898AD<i className="fa-solid fa-arrow-trend-up"></i></h1>
                <h1 className='flex justify-between'>Virat Kohli<i className="fa-solid fa-arrow-trend-up"></i></h1>
                <h1 className='flex justify-between'>Pavan Kalyan<i className="fa-solid fa-arrow-trend-up"></i></h1>
                <h1 className='flex justify-between'>India vs Austrila<i className="fa-solid fa-arrow-trend-up"></i></h1>
            </div>
        </div>
    )
}

export default Home
