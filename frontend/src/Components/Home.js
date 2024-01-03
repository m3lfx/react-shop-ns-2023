import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import MetaData from './Layout/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import axios from 'axios';

import Product from './Product/Product';
import Loader from './Layout/Loader'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Header from './Layout/Header';



const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    "Books",
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
]
const Home = () => {
    const dispatch = useDispatch();
    const {loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products);
    
    const [currentPage, setCurrentPage] = useState(1);
    
    const [price, setPrice] = useState([1, 1000]);
    const[category, setCategory] = useState('')
    let { keyword } = useParams();

    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);

   
    let count = productsCount;

    if (keyword) {
        count = filteredProductsCount
    }
    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    const loadUser = async () => {
        try {
            
            const { data } = await axios.get('/api/v1/me')
    
        } catch (error) {
            console.log( error.response.data.message)
            
        }
    }
    useEffect(() => {
        if(error){
			// return alert.error(error)
            console.log(error)
		}
        dispatch(getProducts(currentPage, keyword,  price, category))
    }, [dispatch, error, currentPage, keyword, price, category]);

   
    // console.log(products)
    return (
        <>
            {loading ? <Loader /> : (<Fragment>
                <MetaData title={'Buy Best Products Online'} />
                
                <div className="container container-fluid">

                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">

                        <div className="row">
                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />
                                            <hr className="my-5" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Categories
                                                </h4>
                                                <ul className="pl-0">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={category}
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                products.map(product => (
                                    <Product key={product._id} product={product} col={3} />
                                ))
                            )}

                        </div>
                    </section>
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>)}
                </div>
            </Fragment>
            )}
        </>

    )
}

export default Home