import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//Fetching//
// const URL = 'http://localhost:8080/users'
const URL = 'https://blog-server-ke1e.onrender.com/users'

function getUsers() {
    return axios.get(URL)
}
function addUser(user) {
    return axios.post(URL, user)
}
//Fetching//


function Register() {
    const navigate = useNavigate()
    const [user, setUser] = useState(
        {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            profile_url: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
        }
    )
    const { mutate: addMutate } = useMutation({
        mutationFn: () => addUser(user), onSuccess: () => {
            setUser({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                profile_url: ""
            });
            navigate('/login')
        }
    })
    function handleSubmit(e) {
        e.preventDefault()
        addMutate()
    }
    return (
        <div className='lg:flex justify-center px-3'>
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-10 border-2 border-purple-600 rounded-lg shadow-lg p-10 mt-10 bg-white' action="">
                <h1 className='mx-auto text-2xl underline'>Create Account</h1>
                <div className='flex flex-col lg:flex-row gap-10 lg:gap-3'>
                    <input onChange={(e) => setUser({ ...user, firstname: e.target.value })} value={user.firstname} required className='border border-black px-3 py-2 rounded-md' type="text" placeholder='First Name' />
                    <input onChange={(e) => setUser({ ...user, lastname: e.target.value })} value={user.lastname} required className='border border-black px-3 py-2 rounded-md' type="text" placeholder='Last Name' />
                </div>
                <input onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} required className='border border-black px-3 py-2 rounded-md' type="email" name="" id="" placeholder='Enter your Email' />
                <input onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} required className='border border-black px-3 py-2 rounded-md' type="password" name="" id="" placeholder='Enter password' />
                <input onChange={(e) => setUser({ ...user, profile_url: e.target.value })} value={user.profile_url} className='border border-black px-3 py-2 rounded-md' type="text" placeholder='Paste image url' />
                <input type="submit" value='Create account' className='border border-black px-3 py-2 rounded-lg w-fit mx-auto' />
            </form>
        </div>
    )
}

export default Register
