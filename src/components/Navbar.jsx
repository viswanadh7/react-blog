import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/auth'
function Navbar() {
    const auth = useAuth()
    // console.log(auth.user)
    // const user = auth.user
    return (
        <>
            <nav className='flex justify-between px-10 items-center sticky top-0 h-14 shadow-lg z-50 bg-white'>
                <Link to='/' className='text-xl'>Blog-On</Link>
                {auth.user !== undefined ? <Link to={`/profile/${auth.user.id}`} className='text-lg'>Hi {auth.user.firstname}</Link> : <Link to='/login' className='text-lg'>Login</Link>}

            </nav>
        </>
    )
}

export default Navbar
