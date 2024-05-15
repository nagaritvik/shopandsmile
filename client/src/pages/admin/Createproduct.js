import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/lay/layout'
import Adminmenu from '../../components/lay/Adminmenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions'

const { option } = Select
const Createproduct = () => {
    const [categories, setcategories] = useState([])
    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [quantity, setquantity] = useState("")
    const [shipping, setshipping] = useState("")
    const [category, setcategory] = useState("")
    const [photo, setphoto] = useState("")
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
    useEffect(() => {
        getallcategories();
    }, [])
    const navigate = useNavigate()
    //creating a product
    const handlecreate = async (e) => {
        e.preventDefault()
        try {
            const productdata = new FormData()
            productdata.append("name", name)
            productdata.append("description", description)
            productdata.append("price", price)
            productdata.append("quantity", quantity)
            productdata.append("category", category)
            productdata.append("photo", photo)
            const { data } = await axios.post('/api/v1/product/create-product', productdata)
            if (data?.success) {
                toast.success('Product created successfully')
                navigate('/dashboard/admin/product')
            }
            else
                toast.error('Error in product creation')
        } catch (error) {
            console.log(error)
            toast.error('Error in creation')
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
                        <h1>Create product</h1>
                        <div className='m-1 w-75'>
                            <Select bordered={false} placeholder='Select a category' size='large' showSearch className='form-select mb-3'
                                onChange={(value) => setcategory(value)}>
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
                                {photo && (<div className='text-center'>
                                    <img src={URL.createObjectURL(photo)} height={'200px'} className='img img-responsive' />
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
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handlecreate}>
                                    CREATE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Createproduct