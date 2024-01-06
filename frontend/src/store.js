import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import {
    productsReducer,
    productDetailsReducer,
    newProductReducer,
    productReducer,
   
} from './reducers/productReducers'
import { authReducer } from './reducers/userReducers';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    auth: authReducer,

})

let initialState = {

}

const middlware = [thunk]
const store = createStore(reducer, initialState, applyMiddleware(...middlware))

export default store;