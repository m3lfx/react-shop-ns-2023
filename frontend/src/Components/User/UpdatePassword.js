import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import MetaData from '../Layout/Metadata';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { getToken } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState('')
    // const [isUpdated, setIsUpdated] = useState(false)
    // const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isUpdated, loading } = useSelector(state => state.user)
    // const updatePassword = async (formData) => {
    //     console.log(formData)
    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${getToken()}`
    //             }
    //         }

    //         const {data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/password/update`, formData, config)
    //         setIsUpdated(data.success)
    //         setLoading(false)
    //         toast.success('password updated', {
    //             position: toast.POSITION.BOTTOM_RIGHT
    //         });
    //         navigate('/me')
    //     } catch (error) {
    //         setError(error.response.data.message)
    //     }
    // }
    // useEffect(() => {
    //     if (error) {
    //         toast.error(error, {
    //             position: toast.POSITION.BOTTOM_RIGHT
    //         });
    //     }
    // }, [error, ])
    useEffect(() => {
        if (error) {
            console.log(error)
            dispatch(clearErrors());
        }
        if (isUpdated) {
            // success('Password updated successfully')
            navigate('/me')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch,  error, navigate, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Change Password'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} >
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update Password</button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdatePassword