import React, { useState, useEffect } from 'react'
import Layout from '../components/lay/layout'
import axios from 'axios'
import slugify from 'slugify'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Categoryproduct = () => {
    const [products, setproducts] = useState([])
    const [category, setcategory] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const getprodbycat = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setproducts(data?.products)
            setcategory(data?.category)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        if (params?.slug) getprodbycat()
    }, [params?.slug])
    return (
        <Layout>
            <div>
                <div className='container mt-3'>

                    <h5 className='text-center'>Category {category?.name}</h5>
                    <h5 className='text-center'>{products?.length} result found</h5>
                    <h1 className='text-center'>All Products</h1>
                    <div className="row">
                        <div className="col-md-9 offset-1">
                            <div className="d-flex flex-wrap">
                                {products?.map((p) => (
                                    <div className="card m-2" key={p._id}>
                                        <img
                                            src={`/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <div className="card-name-price">
                                                <h5 className="card-title">{p.name}</h5>
                                                <h5 className="card-title card-price">
                                                    {p.price.toLocaleString("en-US", {
                                                        style: "currency",
                                                        currency: "USD",
                                                    })}
                                                </h5>
                                            </div>
                                            <p className="card-text ">
                                                {p.description.substring(0, 60)}...
                                            </p>
                                            <div className="card-name-price">
                                                <button
                                                    className="btn btn-info ms-1"
                                                    onClick={() => navigate(`/product/${p.slug}`)}
                                                >
                                                    More Details
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Categoryproduct