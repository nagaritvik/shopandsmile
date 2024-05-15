import React, { useState, useEffect } from 'react'
import Layout from './../components/lay/layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Productdetails = () => {
    //get product
    const params = useParams()
    const [product, setproduct] = useState({})
    const [relatedproducts, setrelatedproducts] = useState([])
    useEffect(() => {
        if (params?.slug) getproduct()
    }, [params?.slug])
    const getproduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setproduct(data?.product)
            getrelatedproducts(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }
    //related products
    const getrelatedproducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setrelatedproducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className='row'>
                <div className='col-md-6'>
                    <img src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top" alt={product.name}
                        height="300" width={"350px"} />
                </div>
                <div className='col-md-6'>
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name: {product.name}</h6>
                    <h6>Description: {product.description}</h6>
                    <h6>Price: {product.price}</h6>
                    <h6>Quantity: {product.quantity}</h6>
                    <h6>Category: {product?.category?.name}</h6>
                    <button className='btn btn-secondary ms-1'>ADD TO CART</button>
                </div>
                <hr />
                <div>
                    <h6>Similar products</h6>
                    {relatedproducts.length < 1 && <p className='text-center'>No similar products Found</p>}
                    <div className='d-flex flex-wrap'>
                        {relatedproducts?.map((c) => (
                            <Link key={c._id} to={`/product/${c.slug}`} className='product-link'>
                                <div className="card m-2" style={{ width: '18rem' }} key={c._id}>
                                    <img src={`/api/v1/product/product-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{c.name}</h5>
                                        <p className="card-text">{c.description.substring(0, 30)}</p>
                                        <p className="card-text">{c.price}</p>

                                        <button class="btn btn-secondary ms-1">ADD TO CART</button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Productdetails