import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/auth'


import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';


// const URL = 'http://localhost:8080/users'
const URL = 'https://blog-express-owat.onrender.com/users'


function Login() {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const { data } = useQuery({ queryKey: ['userData'], queryFn: () => { return axios.get(URL) } })
    const auth = useAuth()
    const [userNotFound, setUserNotFound] = useState(false)
    function handleSubmit(e) {
        e.preventDefault()
        data?.data.map((user) => {
            // console.log(user.email)
            if (user.email == loginData.email) {
                if (user.password == loginData.password) {
                    const sessionUser = { id: user._id, firstname: user.firstname, profile_url: user.profile_url }
                    auth.login(sessionUser)
                    // window.location.reload()
                    navigate(`/profile/${user._id}`)
                    // return (<Navigate to={`/profile/${user.id}`} replace={true} />)
                }
                else {
                    toast.error('Wrong password. Please try again')
                }
            }
            else {
                setUserNotFound(true)

            }
        })
        if (userNotFound) {
            toast.error('User not found!!!. Please create account')
        }

    }
    return (
        <div className='flex justify-center'>
            <form onSubmit={(e) => handleSubmit(e)} className='mt-20 border-2 border-purple-600 p-10 flex flex-col gap-5 lg:w-1/3 rounded-lg bg-white' action="">
                <h1 className='mx-auto text-2xl underline'>Login</h1>
                <input onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} value={loginData.email} className='border border-black px-3 py-2' placeholder='Email' type="email" name="" id="" />
                <input onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} value={loginData.password} className='border border-black px-3 py-2' placeholder='Password' type="password" name="" id="" />
                <input type="submit" value='Login' className='mx-auto px-5 py-1 border border-black rounded-lg cursor-pointer' />
                <Link to='/register' className='underline mx-auto'>Don't have an account? Register here</Link>
            </form>
            <ToastContainer floatingTime={5000} />
        </div>
    )
}

export default Login
