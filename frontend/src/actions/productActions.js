import axios from 'axios';
import { ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS, 
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS 
   } from '../constants/productConstants';
   export const getProducts = (currentPage = 1, keyword = '', price, category = '') => async (dispatch) => {
	try {
		dispatch({
			type: ALL_PRODUCTS_REQUEST
		})
			
            let link = `${process.env.REACT_APP_API}/api/v1/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}`

            if (category) {
                link = `${process.env.REACT_APP_API}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
            }
            const {data} = await axios.get(link)
		
		dispatch({
			type: ALL_PRODUCTS_SUCCESS,
			payload: data
		})

	} catch(error) {
		dispatch({
			type: ALL_PRODUCTS_FAIL,
			payload: error.response.data.message
		})
	}
}

export const clearErrors = () => async (dispatch) =>{
	dispatch({
		type: CLEAR_ERRORS

	})
}