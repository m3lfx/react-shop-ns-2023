import React, {useState} from 'react'
import { Navigate } from 'react-router-dom'

import Loader from '../Layout/Loader'
import { getUser } from '../../utils/helpers';

const ProtectedRoute = ({ children, isAdmin = false }) => {
    const [loading, setLoading] = useState(getUser() === false && false )
    const [error, setError] = useState('')
    const [user, setUser] = useState(getUser())
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    console.log(children.type.name, loading)
    
    if (loading === false) {
        if (!user) {
            return <Navigate to='/login' />
        }
        if (isAdmin === true && user.role !== 'admin') {
            return <Navigate to='/' />
        }
        return children
    }
    return <Loader />;

};

export default ProtectedRoute;