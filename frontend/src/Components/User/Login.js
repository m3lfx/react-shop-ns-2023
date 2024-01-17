import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import Loader from '../Layout/Loader'
import Metadata from '../Layout/Metadata'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

const Login = () => {
    const dispatch = useDispatch()
    const { isAuthenticated, error, loading, user } = useSelector(state => state.auth)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    let location = useLocation();
    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : ''
    const notify = (error) => toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT
    });

    // const login = async (email, password) => {
    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //         const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, config)
    //         console.log(data)
    //         authenticate(data, () => navigate("/"))

    //     } catch (error) {
    //         toast.error("invalid user or password", {
    //             position: toast.POSITION.BOTTOM_RIGHT
    //         })
    //     }
    // }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
        console.log(user)
       
    }

    useEffect(() => {
        if (isAuthenticated && redirect === 'shipping') {
            navigate(`/${redirect}`)
        }
        else if (isAuthenticated)
            navigate('/')
        if (error) {
            // alert.error(error);
            console.log(error)
            notify(error)
            dispatch(clearErrors());
        }
    }, [error, isAuthenticated, dispatch, navigate, redirect])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <Metadata title={'Login'} />

                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg"
                                onSubmit={submitHandler}
                            >
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

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

                                <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>

                                <Link to="/register" className="float-right mt-3">New User?</Link>
                            </form>
                        </div>
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Login