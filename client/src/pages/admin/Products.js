import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Layout from '../../components/lay/layout'
import Adminmenu from '../../components/lay/Adminmenu'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Products = () => {
    const [products, setproducts] = useState([])
    const getallproducts = async (e) => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product')
            setproducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error('Error in getting the products')
        }
    }
    useEffect(() => {
        getallproducts()
    }, [])
    return (
        <Layout>
            <div className='row'>
                <div className='col-md-3 '>
                    <Adminmenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products List</h1>
                    <div className='d-flex flex-wrap'>
                        {products?.map((c) => (
                            <Link key={c._id} to={`/dashboard/admin/product/${c.slug}`} className='product-link'>
                                <div className="card m-2" style={{ width: '18rem' }} key={c._id}>
                                    <img src={`/api/v1/product/product-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{c.name}</h5>
                                        <p className="card-text">{c.description}</p>
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

export default Products