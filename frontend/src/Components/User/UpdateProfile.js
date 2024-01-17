import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../Layout/Metadata'
import { useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'

import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { useDispatch, useSelector } from 'react-redux'

const UpdateProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
    // const [error, setError] = useState('')
    // const [user, setUser] = useState({})
    // const [loading, setLoading] = useState(false)
    // const [isUpdated, setIsUpdated] = useState(false)
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user)

    // const getProfile = async () => {
    //     const config = {
    //         headers: {
    //             // 'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${getToken()}`
    //         }
    //     }
    //     try {
    //         const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`, config)
    //         console.log(data)
    //         // setUser(data.user)
    //         setName(data.user.name);
    //         setEmail(data.user.email);
    //         setAvatarPreview(data.user.avatar.url)
    //         setLoading(false)
    //     } catch (error) {
    //         toast.error('user not found', {
    //             position: toast.POSITION.BOTTOM_RIGHT
    //         });
    //     }
    // }

    // const updateProfile = async (userData) => {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': `Bearer ${getToken()}`
    //         }
    //     }
    //     try {
    //         const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/me/update`, userData, config)
    //         setIsUpdated(data.success)
    //         setLoading(false)
    //         toast.success('user updated', {
    //             position: toast.POSITION.BOTTOM_RIGHT
    //         });
    //         //  getProfile();
    //         navigate('/me', { replace: true })


    //     } catch (error) {
    //         console.log(error)
    //         toast.error('user not found', {
    //             position: toast.POSITION.BOTTOM_RIGHT
    //         });
    //     }
    // }

    // console.log(error)
    // useEffect(() => {
    //     getProfile()

    // }, [])
    useEffect(() => {
        console.log(isUpdated)
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            // alert.success('User updated successfully')
            dispatch(loadUser());
            navigate('/me', { replace: true })
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, isUpdated, navigate, user])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData))
    }

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }
    console.log(user)
    return (
        <Fragment>
            <MetaData title={'Update Profile'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
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

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='image/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProfile