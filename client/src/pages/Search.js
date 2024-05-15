import React from 'react'
import Layout from '../components/lay/layout'
import { useSearch } from '../context/search'
import { Link } from 'react-router-dom'
const Search = () => {
    const [values, setvalues] = useSearch()
    return (
        <Layout title={"Search results"}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search results</h1>
                    <h6>{values?.results?.length < 1 ? "No products found" : `Found ${values?.results.length} product`}</h6>
                    <div className='d-flex flex-wrap mt-4'>
                        {values?.results.map((c) => (
                            <Link key={c._id} to={`/dashboard/admin/product/${c.slug}`} className='product-link'>
                                <div className="card m-2" style={{ width: '18rem' }} key={c._id}>
                                    <img src={`/api/v1/product/product-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{c.name}</h5>
                                        <p className="card-text">{c.description.substring(0, 30)}</p>
                                        <p className="card-text">{c.price}</p>
                                        <a href="#" class="btn btn-primary ms-1">More Details</a>
                                        <a href="#" class="btn btn-secondary ms-1">ADD TO CART</a>
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

export default Search