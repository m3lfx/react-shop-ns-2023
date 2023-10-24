import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import MetaData from '../Layout/Metadata'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    let navigate = useNavigate();
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    let { token } = useParams();

    const resetPassword = async (token, passwords) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/password/reset/${token}`, passwords, config)
            setSuccess(data.success)
        } catch (error) {
            setError(error)
        }
    }
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
        if (success) {
            toast.success('password updated', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            navigate('/login')
        }

    }, [error, success,])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        resetPassword(token, formData)
    }

    return (
        <Fragment>
            <MetaData title={'New Password Reset'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Set Password
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default NewPassword