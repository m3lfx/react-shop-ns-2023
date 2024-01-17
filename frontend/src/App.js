import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Home from './Components/Home'
import ProductDetails from './Components/Product/ProductDetails'
import Login from './Components/User/Login'
import Register from './Components/User/Register';
import Profile from './Components/User/Profile'
import UpdateProfile from './Components/User/UpdateProfile';
import ForgotPassword from './Components/User/ForgotPassword';
import NewPassword from './Components/User/NewPassword';
import UpdatePassword from './Components/User/UpdatePassword';
import Cart from './Components/Cart/Cart';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import Payment from './Components/Cart/Payment';
import OrderSuccess from './Components/Cart/OrderSuccess';
import ListOrders from './Components/Order/ListOrders';
import OrderDetails from './Components/Order/OrderDetails';
import Dashboard from './Components/Admin/Dashboard';
import NewProduct from './Components/Admin/NewProduct';
import ProductsList from './Components/Admin/ProductsList';
import UpdateProduct from './Components/Admin/UpdateProduct';
import OrdersList from './Components/Admin/OrdersList';
import ProcessOrder from './Components/Admin/ProcessOrder';
import UsersList from './Components/Admin/UsersList';
import UpdateUser from './Components/Admin/UpdateUser';
import ProtectedRoute from './Components/Route/ProtectedRoute';
import ProductReviews from './Components/Admin/ProductReviews';
function App() {
  // const [state, setState] = useState({
  //   cartItems: localStorage.getItem('cartItems')
  //     ? JSON.parse(localStorage.getItem('cartItems'))
  //     : [],
  //   shippingInfo: localStorage.getItem('shippingInfo')
  //     ? JSON.parse(localStorage.getItem('shippingInfo'))
  //     : {},
  // })
  // const addItemToCart = async (id, quantity) => {
  //   console.log(id, quantity)
  //   try {
  //     const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/${id}`)
  //     const item = {
  //       product: data.product._id,
  //       name: data.product.name,
  //       price: data.product.price,
  //       image: data.product.images[0].url,
  //       stock: data.product.stock,
  //       quantity: quantity
  //     }

  //     const isItemExist = state.cartItems.find(i => i.product === item.product)
  //     console.log(isItemExist, state)
  //     // setState({
  //     //   ...state,
  //     //   cartItems: [...state.cartItems, item]
  //     // })
  //     if (isItemExist) {
  //       setState({
  //         ...state,
  //         cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
  //       })
  //     }
  //     else {
  //       setState({
  //         ...state,
  //         cartItems: [...state.cartItems, item]
  //       })
  //     }

  //     toast.success('Item Added to Cart', {
  //       position: toast.POSITION.BOTTOM_RIGHT
  //     })

  //   } catch (error) {
  //     toast.error(error, {
  //       position: toast.POSITION.TOP_LEFT
  //     });
  //     // navigate('/')
  //   }

  // }

  // const removeItemFromCart = async (id) => {
  //   setState({
  //     ...state,
  //     cartItems: state.cartItems.filter(i => i.product !== id)
  //   })
  //   localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
  // }

  // const saveShippingInfo = async (data) => {
  //   setState({
  //     ...state,
  //     shippingInfo: data
  //   })
  //   localStorage.setItem('shippingInfo', JSON.stringify(data))
  // }

  return (
    <div className="App">
      <Router>
        {/* <Header cartItems={state.cartItems} /> */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact="true" />
          <Route path="/product/:id" element={<ProductDetails cartItems={state.cartItems} addItemToCart={addItemToCart} />} exact="true" />
          <Route path="/search/:keyword" element={<Home />} exact="true" />

          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/register" element={<Register />} exact="true" />
          <Route path="/me" element={<Profile />} exact="true" />
          <Route path="/me/update" element={<UpdateProfile />} exact="true"
          />
          <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
          <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />
          <Route path="/password/update" element={<UpdatePassword />} />

          <Route path="/cart" element={<Cart cartItems={state.cartItems} addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart} />} exact="true" />
          {/* <Route path="/shipping" element={<Shipping
            shipping={state.shippingInfo}
            saveShippingInfo={saveShippingInfo}
          />}
          /> */}
          <Route path="/shipping" element={<Shipping
            
          />}
          />
          {/* <Route path="/confirm" element={<ConfirmOrder cartItems={state.cartItems} shippingInfo={state.shippingInfo} />} />
          <Route path="/payment" element={<Payment cartItems={state.cartItems} shippingInfo={state.shippingInfo} />} /> */}
          <Route path="/confirm" element={<ConfirmOrder  />} />
          <Route path="/payment" element={<Payment  />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders/me" element={<ListOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/admin/product" element={<NewProduct />} />
          
          <Route
            path="/admin/product/:id"
            element={<UpdateProduct />} />
          <Route
            path="/admin/orders"
            element={<OrdersList />}
          />
          <Route
            path="/admin/order/:id"
            element={<ProcessOrder />} />
          <Route
            path="/admin/users"
            element={<UsersList />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductsList />
              </ProtectedRoute>
            }
          />
          <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true} >
              <ProductReviews />
            </ProtectedRoute>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
