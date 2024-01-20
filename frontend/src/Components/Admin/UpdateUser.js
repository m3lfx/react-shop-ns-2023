import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import MetaData from '../Layout/Metadata'
import Sidebar from './SideBar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errMsg, successMsg } from '../../utils/helpers';
import { getToken } from '../../utils/helpers';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'

import { UPDATE_USER_RESET } from '../../constants/userConstants'

const UpdateUser = () => {
    const dispatch = useDispatch()
    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(true)
    // const [error, setError] = useState('')
    // const [user, setUser] = useState(true)
    // const [isUpdated, setIsUpdated] = useState(false)
    let navigate = useNavigate();

    const { id } = useParams();
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json', 
    //         'Authorization': `Bearer ${getToken()}`
    //     }
    // }
    // const getUserDetails = async (id) => {
    
    //     try {
    //         const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/user/${id}`,config)
    //         setUser(data.user)
    //         setLoading(false)
            
    //     } catch (error) {
    //         setError(error.response.data.message)
    //     }
    // }

    // const updateUser = async (id, userData) => {
    //     try {
    //         const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/user/${id}`, userData, config)
    //         setIsUpdated(data.success)
    //         setLoading(false)
            
    //     } catch (error) {
    //        setError(error.response.data.message)
    //     }
    // }

    useEffect(() => {
        // console.log(user && user._id !== userId);
        if (user && user._id !== id) {
            dispatch(getUserDetails(id))
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role)
        }
        if (error) {
            errMsg(error);
            // setError('');
            dispatch(clearErrors());
        }
        if (isUpdated) {
            successMsg('User updated successfully')
            navigate('/admin/users')
            dispatch({
                type: UPDATE_USER_RESET
            })
           
        }
    }, [error, isUpdated, id, user, dispatch, navigate])
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('role', role);
        dispatch(updateUser(user._id, formData))
    }

    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update User</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>
                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateUser