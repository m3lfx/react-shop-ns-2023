import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import MetaData from '../Layout/Metadata'
import Loader from '../Layout/Loader'
import Sidebar from './SideBar'
import { getToken } from '../../utils/helpers';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserSalesChart from './UserSalesChart';
import MonthlySalesChart from './MonthlySalesChart';
import ProductSalesChart from './ProductSalesChart';

import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../actions/productActions'

const Dashboard = () => {
    const dispatch = useDispatch();
    // const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    // const [loading, setLoading] = useState(true)
    const [totalAmount, setTotalAmount] = useState([])
    const { products, loading  } = useSelector(state => state.products)
    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
    // const getAdminProducts = async () => {
    //     try {

    //         const config = {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Authorization': `Bearer ${getToken()}`
    //             }
    //         }

    //         const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/products`, config)
    //         console.log(data)
    //         setProducts(data.products)
    //         setLoading(false)
    //     } catch (error) {
    //         setError(error.response.data.message)

    //     }
    // }

    useEffect(() => {
        dispatch(getAdminProducts())
        // allOrders()
        // allUsers()
    }, [dispatch])

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            {/* <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                                            </div> */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">

                                        {/* <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                        </div> */}

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">

                                        {/* <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div> */}

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        {/*<div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <b>0</b></div>
                                        </div>*/}

                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
                <Fragment>
                    <UserSalesChart />
                </Fragment>
                <Fragment>
                    <MonthlySalesChart />
                </Fragment>
                <Fragment>
                    <ProductSalesChart />
                </Fragment>
            </div>
        </Fragment >
    )
}

export default Dashboard