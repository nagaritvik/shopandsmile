
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/lay/layout'
import Adminmenu from '../../components/lay/Adminmenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions'

const Updateproduct = () => {
    const [categories, setcategories] = useState([])
    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [quantity, setquantity] = useState("")
    const [shipping, setshipping] = useState("")
    const [category, setcategory] = useState("")
    const [photo, setphoto] = useState("")
    const [id, setid] = useState("")
    //get all categories
    const getallcategories = async (req, res) => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setcategories(data?.category)
            }
            toast.success('All categories list')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    //get single product
    const getsingleprodct = async (e) => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setname(data.product.name)
            setdescription(data.product.description)
            setprice(data.product.price)
            setquantity(data.product.quantity)
            setcategory(data.product.category._id)
            setshipping(data.product.shipping)
            setid(data.product._id)
        } catch (error) {
            console.log(error)
            toast.error('Error in getting product')
        }
    }
    useEffect(() => {
        getallcategories();
    }, [])
    useEffect(() => {
        getsingleprodct()
    }, [])
    const navigate = useNavigate()
    const params = useParams()
    //updating a product
    const handleupdate = async () => {
        try {
            const productdata = new FormData()
            productdata.append("name", name)
            productdata.append("description", description)
            productdata.append("price", price)
            productdata.append("quantity", quantity)
            productdata.append("category", category)
            photo && productdata.append("photo", photo)
            const { data } = axios.put(`/api/v1/product/update-product/${id}`, productdata)
            if (data?.success) {
                toast.error(data?.message)
            }
            else {
                toast.success('Product updated successfully')
                navigate('/dashboard/admin/product')
            }
        } catch (error) {
            console.log(error)
            toast.error('Error in updation')
        }
    }
    //deleting a product
    const handledelete = () => {
        let answer = window.prompt('Are you sure want to delete the product? if yes enter yes')
        if (!answer)
            return;
        try {
            const { data } = axios.delete(`/api/v1/product/delete-product/${id}`)
            toast('Product deleted successfully')
            navigate('/dashboard/admin/product')
        } catch (error) {
            console.log(error)
            toast.error('error in deletion')
        }
    }
    return (
        <Layout>

            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Adminmenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Update product</h1>
                        <div className='m-1 w-75'>
                            <Select bordered={false} placeholder='Select a category' size='large' showSearch className='form-select mb-3'
                                onChange={(value) => setcategory(value)} value={category}>
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                ))}
                            </Select>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : 'Upload photo'}
                                    <input type='file' name='photo' accept='image/*' onChange={(e) => setphoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo ? (<div className='text-center'>
                                    <img src={URL.createObjectURL(photo)} height={'200px'} className='img img-responsive' />
                                </div>) : (<div className='text-center'>
                                    <img src={`/api/v1/product/product-photo/${id}`} height={'200px'} className='img img-responsive' />
                                </div>)}
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={name} placeholder='Enter a name' className='form-control'
                                    onChange={(e) => setname(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setdescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setprice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setquantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setshipping(value);
                                    }}
                                    value={shipping ? "yes" : 'no'}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleupdate}>
                                    UPDATE PRODUCT
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={handledelete}>
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Updateproduct