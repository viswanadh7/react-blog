import React from 'react'
import { useAuth } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

function RequireAuth({ children }) {
    const auth = useAuth()
    const navigate = useNavigate()
    if (auth.user == undefined) {
        navigate('/login')
    }
    return children
}

export default RequireAuth
