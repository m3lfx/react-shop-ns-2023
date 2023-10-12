import React, { Fragment, useState, useEffect } from 'react'
import MetaData from './Layout/Metadata'
import axios from 'axios';

import Product from './Product/Product';

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [error, setError] = useState()
    const [productsCount, setProductsCount] = useState(0)

    const getProducts = async () => {
        let link = `http://localhost:4001/api/v1/products`
        console.log(link)
        let res = await axios.get(link)
        console.log(res)
        setProducts(res.data.products)
    }

    useEffect(() => {
        getProducts()
    }, [])
    console.log(products)
    return (
        <Fragment>
            <MetaData title={'Buy Best Products Online'} />
            <div className="container container-fluid">
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                    <div className="row">
                    {products && products.map(product => (
                        <Product key={product._id} product={product} col={4} />
                    ))}
                    </div>
                </section>
            </div>
        </Fragment>
    )
}

export default Home