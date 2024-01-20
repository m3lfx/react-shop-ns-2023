import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../Layout/Metadata'
import Loader from '../Layout/Loader'
import Sidebar from './SideBar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import { allOrders,  clearErrors,  deleteOrder
 } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const OrdersList = () => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)
    let navigate = useNavigate();
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState('')
    // const [allOrders, setAllOrders] = useState([])
    // const [isDeleted, setIsDeleted] = useState(false)
    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    // const listOrders = async () => {
    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${getToken()}`
    //             }
    //         }
    //         const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/orders`, config)
    //         setAllOrders(data.orders)
    //         setLoading(false)
    //     } catch (error) {
    //         setError(error.response.data.message)
    //     }
    // }
    // const deleteOrder = async (id) => {
    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${getToken()}`
    //             }
    //         }
    //         const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/order/${id}`, config)
    //         setIsDeleted(data.success)
    //         setLoading(false)
    //     } catch (error) {
    //         setError(error.response.data.message)

    //     }
    // }
    useEffect(() => {
        dispatch(allOrders())
        if (error) {
            errMsg(error)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            successMsg('Order deleted successfully');
            navigate('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }
    }, [error, isDeleted, dispatch, navigate])
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },

                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: <Fragment>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
        return data;
    }
    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default OrdersList