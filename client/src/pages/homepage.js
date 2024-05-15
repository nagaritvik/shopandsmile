import React, { useState, useEffect } from 'react'
import Layout from '../components/lay/layout'
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
import "../styles/Homepage.css"
const Homepage = () => {
    const [checked, setchecked] = useState([])
    const [products, setproducts] = useState([])
    const [categories, setcategories] = useState([])
    const [radio, setradio] = useState([])
    const [total, settotal] = useState(0)
    const [page, setpage] = useState(1)
    const [cart, setcart] = useCart()
    const [loading, setloading] = useState(true)
    //get total
    const gettotal = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-count`)
            settotal(data?.total)
        } catch (error) {
            console.log(error)
        }
    }
    //get all products
    const getallproducts = async () => {
        try {
            setloading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setloading(false)
            setproducts(data.products)
        } catch (error) {
            setloading(false)
            console.log(error)

        }
    }
    useEffect(() => {
        if (!checked.length || !radio.length) getallproducts();
        //eslint-disable-next-line
    }, [checked.length, radio.length])
    //get all categories
    const getallcategories = async (req, res) => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setcategories(data.category)
            }
            toast.success('All categories list')
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getallcategories();
        gettotal();
    }, [])
    //handling the filter

    const handlefilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        }
        else {
            all = all.filter(c => c !== id)
        }
        setchecked(all)
    }
    useEffect(() => {
        filteredproduct();
    }, [checked, radio])
    //get filtered products
    const filteredproduct = async () => {
        try {
            const { data } = await axios.post(`/api/v1/product/filter-product`, { checked, radio })
            setproducts(data?.products)
        } catch (error) {
            console.log(error)
            toast.error('Error in filter')
        }
    }
    const navigate = useNavigate()
    return (
        <Layout title={"Home-Ecommerce app"}>
            <div className='row mt-3'>
                <div className='col-md-2'>
                    <h4 className='text-center'>Filter by category</h4>
                    <div className='d-flex flex-column'>
                        {categories.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handlefilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                        ))}
                    </div>
                    <h4 className='text-center'>Filter by Price</h4>
                    <div className='d-flex flex-column'>
                        <Radio.Group onChange={(e) => setradio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className='d-flex flex-column'>
                        <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTERS</button>
                    </div>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products</h1>
                    <div className='d-flex flex-wrap'>
                        {products?.map((c) => (
                            <Link key={c._id} to={`/product/${c.slug}`} className='product-link'>
                                <div className="card m-2" style={{ width: '18rem' }} key={c._id}>
                                    <img src={`/api/v1/product/product-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{c.name}</h5>
                                        <p className="card-text">{c.description.substring(0, 30)}</p>
                                        <p className="card-text">{c.price}</p>
                                        <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${c.slug}`)}>More Details</button>

                                        <button class="btn btn-secondary ms-1"
                                            onClick={() => {

                                                setcart([...cart, c])
                                                toast.success('Item added to cart')
                                                localStorage.setItem('cart', JSON.stringify([...cart, c]))
                                            }}>ADD TO CART</button>

                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button className='btn btn-warning' onClick={(e) => {
                                e.preventDefault()
                                setpage(page + 1)
                            }}>
                                {loading ? ("Loading") : ("Load more")}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout >

    )
}

export default Homepage