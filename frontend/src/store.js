import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import {
    productsReducer,
    productDetailsReducer,
    newProductReducer,
    productReducer,

} from './reducers/productReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,

})

let initialState = {

}

const middlware = [thunk]
const store = createStore(reducer, initialState, applyMiddleware(...middlware))

export default store;